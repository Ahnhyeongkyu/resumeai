import { pgTable, uuid, text, timestamp, integer, jsonb, boolean, uniqueIndex, index } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull(),
  plan: text('plan', { enum: ['free', 'basic', 'pro'] }).notNull().default('free'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  emailUnique: uniqueIndex('users_email_unique').on(table.email),
}));

export const resumes = pgTable('resumes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id'),
  email: text('email').notNull(),
  jobDescription: text('job_description').notNull(),
  personalInfo: jsonb('personal_info').notNull(),
  experience: jsonb('experience').notNull(),
  education: jsonb('education'),
  skills: jsonb('skills'),
  careerSituation: text('career_situation').notNull(),
  generatedResume: jsonb('generated_resume'),
  atsScore: jsonb('ats_score'),
  template: text('template').default('Classic'),
  downloaded: boolean('downloaded').notNull().default(false),
  downloadCount: integer('download_count').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  emailIdx: index('resumes_email_idx').on(table.email),
}));

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  gumroadSaleId: text('gumroad_sale_id').notNull(),
  gumroadPermalink: text('gumroad_permalink').notNull(),
  amount: integer('amount').notNull(),
  currency: text('currency').notNull().default('usd'),
  status: text('status', { enum: ['pending', 'completed', 'refunded', 'failed'] }).notNull().default('pending'),
  resumeId: uuid('resume_id'),
  userEmail: text('user_email').notNull(),
  plan: text('plan', { enum: ['basic', 'pro'] }).notNull(),
  downloadCount: integer('download_count').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  saleIdUnique: uniqueIndex('payments_sale_id_unique').on(table.gumroadSaleId),
  emailIdx: index('payments_email_idx').on(table.userEmail),
  resumeIdx: index('payments_resume_idx').on(table.resumeId),
}));

export const emailSubscribers = pgTable('email_subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull(),
  source: text('source'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  emailUnique: uniqueIndex('email_subscribers_email_unique').on(table.email),
}));

export const stats = pgTable('stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  metric: text('metric').notNull(),
  value: integer('value').notNull().default(0),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  metricUnique: uniqueIndex('stats_metric_unique').on(table.metric),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Resume = typeof resumes.$inferSelect;
export type NewResume = typeof resumes.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type EmailSubscriber = typeof emailSubscribers.$inferSelect;
export type NewEmailSubscriber = typeof emailSubscribers.$inferInsert;
