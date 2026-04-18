import { eq, and, sql } from 'drizzle-orm';
import { db } from './index';
import { users, resumes, payments, emailSubscribers, stats } from './schema';
import type { NewUser, NewResume, NewPayment, NewEmailSubscriber } from './schema';

export async function upsertUser(input: { email: string; plan?: 'free' | 'basic' | 'pro' }) {
  const existing = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
  if (existing.length > 0) {
    const current = existing[0];
    if (input.plan && shouldUpgrade(current.plan, input.plan)) {
      const [updated] = await db
        .update(users)
        .set({ plan: input.plan, updatedAt: new Date() })
        .where(eq(users.id, current.id))
        .returning();
      return updated;
    }
    return current;
  }
  const insertValue: NewUser = { email: input.email, plan: input.plan ?? 'free' };
  const [created] = await db.insert(users).values(insertValue).returning();
  return created;
}

function shouldUpgrade(current: 'free' | 'basic' | 'pro', incoming: 'free' | 'basic' | 'pro'): boolean {
  const rank = { free: 0, basic: 1, pro: 2 } as const;
  return rank[incoming] > rank[current];
}

export async function createResume(input: NewResume) {
  const [row] = await db.insert(resumes).values(input).returning();
  return row;
}

export async function getResumeById(id: string) {
  const rows = await db.select().from(resumes).where(eq(resumes.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getLatestResumeByEmail(email: string) {
  const rows = await db
    .select()
    .from(resumes)
    .where(eq(resumes.email, email))
    .orderBy(resumes.createdAt)
    .limit(50);
  return rows[rows.length - 1] ?? null;
}

export async function markResumeDownloaded(id: string) {
  const [row] = await db
    .update(resumes)
    .set({ downloaded: true, downloadCount: sql`${resumes.downloadCount} + 1` })
    .where(eq(resumes.id, id))
    .returning();
  return row;
}

export async function recordPayment(input: NewPayment) {
  const [row] = await db
    .insert(payments)
    .values(input)
    .onConflictDoNothing({ target: payments.gumroadSaleId })
    .returning();
  return row;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function findPayment(opts: { email: string; resumeId?: string; plan?: 'basic' | 'pro' }) {
  const conditions = [eq(payments.userEmail, opts.email), eq(payments.status, 'completed')];
  if (opts.resumeId && UUID_RE.test(opts.resumeId)) {
    conditions.push(eq(payments.resumeId, opts.resumeId));
  }
  if (opts.plan) conditions.push(eq(payments.plan, opts.plan));
  const rows = await db
    .select()
    .from(payments)
    .where(and(...conditions))
    .limit(1);
  return rows[0] ?? null;
}

export async function findActivePaymentForEmail(email: string) {
  const rows = await db
    .select()
    .from(payments)
    .where(and(eq(payments.userEmail, email), eq(payments.status, 'completed')))
    .orderBy(payments.createdAt);
  return rows;
}

export async function incrementPaymentDownloadCount(paymentId: string) {
  const [row] = await db
    .update(payments)
    .set({ downloadCount: sql`${payments.downloadCount} + 1` })
    .where(eq(payments.id, paymentId))
    .returning();
  return row;
}

export async function subscribeEmail(input: NewEmailSubscriber) {
  const [row] = await db
    .insert(emailSubscribers)
    .values(input)
    .onConflictDoNothing({ target: emailSubscribers.email })
    .returning();
  return row;
}

export async function incrementStat(metric: string, by = 1) {
  await db
    .insert(stats)
    .values({ metric, value: by })
    .onConflictDoUpdate({
      target: stats.metric,
      set: { value: sql`${stats.value} + ${by}`, updatedAt: new Date() },
    });
}
