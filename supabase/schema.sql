-- Elite Butchery — Supabase schema + seed (generated from data.js)
-- Paste this whole file into Supabase → SQL Editor → Run.

-- ---------- tables ----------
create table if not exists public.products (
  id          text primary key,
  name        text not null,
  swahili     text default '',
  category    text not null,
  art         text default 'beef',
  img         text default '',
  unit        text not null default 'kg',      -- 'kg' or 'each'
  price       numeric not null default 0,
  step        numeric not null default 0.5,
  min         numeric not null default 0.5,
  available   boolean not null default true,
  tag         text default '',
  price_note  text default '',
  sort        int  not null default 0,
  updated_at  timestamptz not null default now()
);

create table if not exists public.settings (
  id          int primary key default 1,
  data        jsonb not null,
  updated_at  timestamptz not null default now(),
  constraint settings_singleton check (id = 1)
);

-- ---------- row level security ----------
alter table public.products enable row level security;
alter table public.settings enable row level security;

-- everyone can READ (public storefront)
create policy "public read products"  on public.products for select using (true);
create policy "public read settings"  on public.settings for select using (true);

-- only signed-in admins can WRITE (insert/update/delete)
create policy "auth write products"   on public.products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write settings"   on public.settings for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------- seed: business settings ----------
insert into public.settings (id, data) values (1, '{"name":"Elite Butchery","tagline":"Premium cuts, cut to order — fresh meat delivered across Nairobi.","location":"Uthiru, Nairobi","address":"Uthiru, Nairobi, Kenya","phone":"+254 718 509 658","whatsapp":"254718509658","mpesaTill":"4094694","email":"","maps":"https://share.google/fJHupcYnzKP6Agm3y","hours":"Open daily: 9:00am – 11:00pm","wholesale":"Hotels, butcheries & events — carcass and bulk rates on request.","deliveryNote":"Free delivery within 1 km of our Uthiru shop · beyond 1 km, delivery charges apply · Pay on delivery","deliveryFee":0,"freeDeliveryThreshold":0,"estYear":"2023"}'::jsonb)
  on conflict (id) do update set data = excluded.data, updated_at = now();

-- ---------- seed: products ----------
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('beef','Beef','Nyama ya ng''ombe','Beef','beef','assets/img/beef-bone-in.jpg','kg',800,0.5,0.5,true,'Popular','',0)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('beef-mince','Minced Meat','Kima','Beef','mince','assets/img/beef-mince.jpg','kg',880,0.5,0.5,true,'','',1)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('soup-bones','Soup Bones','Mifupa','Beef','beef','assets/img/soup-bones.jpg','kg',250,0.5,0.5,true,'','',2)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('beef-blade','Beef Blade','Gichiri','Beef','beef','assets/img/beef-blade.jpg','kg',870,0.5,0.5,true,'','',3)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('ossobuco','Ossobuco','','Beef','beef','assets/img/ossobuco.jpg','kg',880,0.5,0.5,true,'','',4)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('t-bone','T-Bone Steak','','Beef','steak','assets/img/t-bone.jpg','kg',980,0.5,0.5,true,'Steakhouse','',5)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('ribeye','Ribeye Steak','','Beef','steak','assets/img/ribeye.jpg','kg',980,0.5,0.5,true,'Steakhouse','',6)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('beef-fillet','Beef Fillet','','Beef','steak','assets/img/beef-fillet.jpg','kg',1500,0.5,0.5,true,'Premium','',7)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('goat-leg','Goat Leg','Mbuzi — mguu','Goat','goat','assets/img/goat-leg.jpg','kg',950,0.5,0.5,true,'','',8)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('goat-shoulder','Goat Shoulder','Mbuzi — bega','Goat','goat','assets/img/goat-shoulder.jpg','kg',950,0.5,0.5,true,'','',9)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('goat-ribs','Goat Ribs','Mbuzi — mbavu','Goat','goat','assets/img/goat-ribs.jpg','kg',800,0.5,0.5,true,'Choma favourite','',10)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('chicken-kienyeji','Kuku Kienyeji','Indigenous chicken','Chicken','chicken','assets/img/chicken-kienyeji.jpg','kg',980,0.5,1,true,'Free-range','',11)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('capon','Capon','','Chicken','chicken','assets/img/chicken-broiler.jpg','each',600,1,1,true,'','KSh 300 per half',12)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('chicken-boneless','Boneless Chicken','','Chicken','chicken','assets/img/chicken-boneless.jpg','kg',880,0.5,0.5,true,'','',13)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('chicken-thighs','Chicken Thighs','','Chicken','chicken','assets/img/chicken-thighs.jpg','kg',830,0.5,0.5,true,'','',14)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('drumsticks','Chicken Drumsticks','','Chicken','chicken','assets/img/drumsticks.jpg','kg',780,0.5,0.5,true,'','',15)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('chicken-wings','Chicken Wings','','Chicken','chicken','assets/img/chicken-wings.jpg','kg',750,0.5,0.5,true,'','',16)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('liver','Liver','Maini','Offal','offal','assets/img/liver.jpg','kg',850,0.5,0.5,true,'','',17)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('fish-fillet','Fish Fillet','','Fish','fish','assets/img/fish-fillet.jpg','kg',1250,0.5,0.5,true,'','',18)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
insert into public.products (id,name,swahili,category,art,img,unit,price,step,min,available,tag,price_note,sort) values ('tilapia','Fresh Tilapia','Ngege','Fish','fish','assets/img/tilapia.jpg','each',200,1,1,true,'','from · priced by size',19)
  on conflict (id) do update set name=excluded.name,swahili=excluded.swahili,category=excluded.category,art=excluded.art,img=excluded.img,unit=excluded.unit,price=excluded.price,step=excluded.step,min=excluded.min,available=excluded.available,tag=excluded.tag,price_note=excluded.price_note,sort=excluded.sort,updated_at=now();
