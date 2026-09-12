-- Schema for Tư Thành - Nông Cơ Thành Đạt 2 (Machinery Orders)
CREATE TABLE IF NOT EXISTS public.thanhdat_machinery_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    delivery_street TEXT NOT NULL,
    delivery_district TEXT,
    delivery_province TEXT NOT NULL,
    delivery_notes TEXT,
    delivery_speed TEXT DEFAULT 'Chành Xe Tiêu Chuẩn',
    payment_method TEXT NOT NULL,
    items JSONB NOT NULL,
    subtotal NUMERIC(14,0) NOT NULL,
    shipping_fee NUMERIC(12,0) DEFAULT 0,
    total NUMERIC(14,0) NOT NULL,
    status TEXT DEFAULT 'Chờ Xác Nhận',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.thanhdat_machinery_orders ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'thanhdat_machinery_orders' AND policyname = 'Enable insert for everyone'
  ) THEN
    CREATE POLICY "Enable insert for everyone" ON public.thanhdat_machinery_orders 
    FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'thanhdat_machinery_orders' AND policyname = 'Enable read for everyone'
  ) THEN
    CREATE POLICY "Enable read for everyone" ON public.thanhdat_machinery_orders 
    FOR SELECT USING (true);
  END IF;
END $$;
