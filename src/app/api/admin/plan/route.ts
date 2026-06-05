// 운영 조회 툴(회장 지시 6/5): timebox Supabase entitlement(app_metadata.plan)을 매번 추측 없이 조회.
// service_role 키는 Vercel "Sensitive"라 로컬 pull 불가 → 키를 가진 'app' 런타임에서 조회하고 secret으로 가드.
// 사용: GET /api/admin/plan?secret=<ADMIN_QUERY_SECRET>&email=<email>  (email 생략 시 전체 요약)
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type GoUser = {
  id: string;
  email?: string;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
  created_at?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret') || '';
  const email = (searchParams.get('email') || '').toLowerCase().trim();

  const guard = process.env.ADMIN_QUERY_SECRET;
  if (!guard || secret !== guard) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const url = process.env.TIMEBOX_SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.TIMEBOX_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: 'timebox_supabase_env_missing' }, { status: 500 });
  }

  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const r = await fetch(`${url}/auth/v1/admin/users?per_page=500`, { headers });
  if (!r.ok) {
    return NextResponse.json({ error: `lookup_${r.status}`, detail: (await r.text()).slice(0, 200) }, { status: 502 });
  }
  const body = (await r.json()) as { users?: GoUser[] };
  const users = body.users || [];
  const planOf = (u: GoUser) => String((u.app_metadata || {}).plan ?? (u.user_metadata || {}).plan ?? 'free');

  if (email) {
    const u = users.find((x) => (x.email || '').toLowerCase() === email);
    if (!u) return NextResponse.json({ found: false, email, total_users: users.length });
    return NextResponse.json({
      found: true,
      email: u.email,
      plan: planOf(u),
      app_metadata: u.app_metadata ?? {},
      created_at: u.created_at,
    });
  }

  const summary = users.reduce<Record<string, number>>((acc, u) => {
    const p = planOf(u);
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});
  return NextResponse.json({
    total_users: users.length,
    plan_summary: summary,
    pro_users: users.filter((u) => planOf(u) === 'pro').map((u) => u.email),
  });
}
