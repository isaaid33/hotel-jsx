import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, BedDouble, Utensils, Timer, Star, Search, ShieldCheck, Wifi, Car, Bath, Smartphone, PartyPopper, Landmark, BookOpen, Mountain, Bus, Navigation, Hotel, Clock, Coffee, Camera, MessageSquare, PenSquare } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Hotel Reviews – AeroGlass Style
 * 
 * Características:
 * - Buscador superior + filtros rápidos
 * - Listado de hoteles con tarjetas y calificación
 * - Vista de detalle por pestañas: Servicios, Habitaciones, Menú del hotel, Fotos
 * - Secciones: Qué hacer, Restaurantes cercanos, Cómo llegar, Alquiler a largo plazo
 * - Buscador por IA (sandbox) para consultas sobre hoteles y reseñas
 * - Estética AeroGlass (verde/azul/café), con blur, brillos y "ventana" superior
 * 
 * Notas técnicas:
 * - Tailwind + shadcn/ui + lucide-react + Framer Motion
 * - Componente único export default
 */

// --- Datos de ejemplo ---
const HOTELS = [
  {
    id: "1",
    name: "AquaVerde Boutique Hotel",
    location: "Montpellier, Francia",
    rating: 4.6,
    priceFrom: 129,
    tags: ["Eco", "Centro", "Pet-friendly"],
    thumbnail: "https://images.unsplash.com/photo-1551776235-dde6d4829808?q=80&w=1200&auto=format&fit=crop",
    services: [
      { icon: Wifi, label: "Wi‑Fi 1Gbps" },
      { icon: ShieldCheck, label: "Caja fuerte" },
      { icon: Bath, label: "Spa & sauna" },
      { icon: Coffee, label: "Desayuno local" },
      { icon: Car, label: "Parqueo" },
    ],
    rooms: [
      { type: "Habitación Deluxe", beds: "1 King", size: 28, perks: ["Balcón", "Vista ciudad", "Cafetera"] },
      { type: "Suite Familiar", beds: "2 Queen", size: 42, perks: ["Cocineta", "Sofá cama", "Bañera"] },
    ],
    menu: [
      { name: "Ravioli de setas", price: 16, tag: "Veg" },
      { name: "Ratatouille provenzal", price: 14, tag: "Veg" },
      { name: "Filete al rouille", price: 22, tag: "Chef" },
      { name: "Crème brûlée", price: 8, tag: "Postre" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    ],
    nearby: {
      do: [
        { icon: Mountain, title: "Excursión a Pic Saint‑Loup", tip: "Tour al amanecer" },
        { icon: Camera, title: "Casco histórico", tip: "Ruta fotográfica 2h" },
        { icon: PartyPopper, title: "Vinos del Languedoc", tip: "Cata guiada" },
      ],
      food: [
        { name: "Le Café Marron", distance: "300 m", score: 4.5 },
        { name: "Azul Mar & Bar", distance: "500 m", score: 4.3 },
        { name: "Trattoria Bosco", distance: "650 m", score: 4.6 },
      ],
      transport: {
        howTo: [
          { icon: Bus, label: "Bus L1 – Parada République (5 min)" },
          { icon: Navigation, label: "Caminar desde Place de la Comédie (8 min)" },
          { icon: Landmark, label: "Tranvía T2 – Est. Saint‑Roch" },
        ],
        mapEmbed: "https://www.openstreetmap.org/export/embed.html?bbox=3.862%2C43.605%2C3.885%2C43.616&layer=mapnik",
      },
      longStay: {
        minNights: 14,
        monthlyFrom: 1890,
        perks: ["Limpieza semanal", "Descuento 20%", "Escritorio ergonomico"],
      },
    },
  },
  {
    id: "2",
    name: "Costa Café Hotel & Spa",
    location: "Sète, Francia",
    rating: 4.4,
    priceFrom: 99,
    tags: ["Frente al mar", "Spa", "Café de autor"],
    thumbnail: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop",
    services: [
      { icon: Wifi, label: "Wi‑Fi" },
      { icon: Bath, label: "Hammam" },
      { icon: Smartphone, label: "Check‑in móvil" },
      { icon: Car, label: "Bicis & scooters" },
    ],
    rooms: [
      { type: "Vista Mar", beds: "1 Queen", size: 24, perks: ["Terraza", "Minibar", "Ducha lluvia"] },
      { type: "Doble Superior", beds: "2 Twin", size: 30, perks: ["Escritorio", "Chromecast"] },
    ],
    menu: [
      { name: "Bouillabaisse", price: 24, tag: "Clásico" },
      { name: "Tiramisú café", price: 9, tag: "Postre" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1501117716987-c8e7ec1083f1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1200&auto=format&fit=crop",
    ],
    nearby: {
      do: [
        { icon: BookOpen, title: "Museo del Mar", tip: "Colección histórica" },
        { icon: Mountain, title: "Subida al Mont Saint‑Clair", tip: "Mirador" },
      ],
      food: [
        { name: "Brasserie du Port", distance: "250 m", score: 4.2 },
        { name: "Verde Oliva", distance: "450 m", score: 4.5 },
      ],
      transport: {
        howTo: [
          { icon: Bus, label: "Bus 3 – Quai d'Alger" },
          { icon: Navigation, label: "Bicicleta costera" },
        ],
        mapEmbed: "https://www.openstreetmap.org/export/embed.html?bbox=3.686%2C43.393%2C3.708%2C43.412&layer=mapnik",
      },
      longStay: {
        minNights: 7,
        monthlyFrom: 1490,
        perks: ["Lavandería incluida", "Coffee pass", "Co‑working"],
      },
    },
  },
];

// --- Helpers UI ---
const GlassIcon = ({ Icon, size = 24 }) => (
  <div className="relative w-12 h-12 grid place-items-center rounded-2xl shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.6),0_10px_30px_rgba(0,0,0,0.25)] bg-gradient-to-br from-white/60 via-white/20 to-white/5 backdrop-blur-xl border border-white/40">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-200/40 via-sky-200/30 to-amber-200/30" />
    <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-white/60 blur-sm" />
    <Icon size={size} className="relative drop-shadow" />
  </div>
);

const StarRating = ({ value = 0 }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={"w-4 h-4 " + (i < full ? "fill-yellow-400 text-yellow-400" : half && i === full ? "text-yellow-400" : "text-white/60")} />
      ))}
      <span className="text-xs ml-1 opacity-80">{value.toFixed(1)}</span>
    </div>
  );
};

const Tag = ({ children }) => (
  <Badge className="bg-gradient-to-r from-emerald-500/80 via-sky-500/80 to-amber-600/80 text-white border-0 shadow">{children}</Badge>
);

// --- Componente principal ---
export default function HotelReviewsAeroGlass() {
  const [query, setQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponses, setAiResponses] = useState([]);
  const [activeHotel, setActiveHotel] = useState(HOTELS[0]);

  const filtered = useMemo(() => {
    if (!query) return HOTELS;
    const q = query.toLowerCase();
    return HOTELS.filter((h) =>
      [h.name, h.location, ...(h.tags || [])].join(" ").toLowerCase().includes(q)
    );
  }, [query]);

  const askAI = async () => {
    if (!aiQuery.trim()) return;
    // 🔒 Placeholder – integrar tu backend/LLM aquí.
    // Simulamos una respuesta con heurística local.
    const q = aiQuery.toLowerCase();
    let hint = "";
    if (q.includes("spa") || q.includes("relaj")) hint = "El AquaVerde y Costa Café disponen de spa / hammam.";
    if (q.includes("largo") || q.includes("mensual")) hint = "El AquaVerde ofrece desde 1890€/mes y Costa Café desde 1490€/mes (ejemplo).";
    if (q.includes("wifi")) hint = "AquaVerde: Wi‑Fi 1Gbps. Costa Café: Wi‑Fi estable + Chromecast.";
    const mock = {
      id: Date.now(),
      q: aiQuery,
      a: hint || "Según tus preferencias, ambos hoteles son buenas opciones. Filtra por ‘Eco’ o ‘Frente al mar’ para acotar.",
    };
    setAiResponses((prev) => [mock, ...prev]);
    setAiQuery("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo animado AeroGlass */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.25),transparent_45%),radial-gradient(circle_at_30%_80%,rgba(124,45,18,0.25),transparent_45%)]" />
        <motion.div
          className="absolute -inset-20 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.12),transparent,rgba(255,255,255,0.12))]"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, ease: "linear", repeat: Infinity }}
        />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      {/* Ventana superior estilo sistema */}
      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/30 bg-white/20 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          {/* Barra de título */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-200/40 via-sky-200/40 to-amber-200/40 border-b border-white/30">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-inner" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-inner" />
              <span className="w-3.5 h-3.5 rounded-full bg-sky-500 shadow-inner" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <GlassIcon Icon={Hotel} />
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Reseñas de Hoteles</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="secondary" className="bg-white/50 hover:bg-white/70 border-white/40">Iniciar sesión</Button>
              <Button className="bg-gradient-to-r from-emerald-600 to-sky-600 border-0">Crear cuenta</Button>
            </div>
          </div>

          {/* Buscador global */}
          <div className="p-4 sm:p-6">
            <div className="grid sm:grid-cols-5 gap-3">
              <div className="sm:col-span-3 flex items-center gap-2 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 px-3">
                <Search className="w-5 h-5 opacity-70" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Busca por ciudad, hotel, etiqueta (Eco, Spa, Centro, Mar)"
                  className="bg-transparent border-0 focus-visible:ring-0"
                />
              </div>
              <Button className="rounded-2xl bg-gradient-to-br from-emerald-600 to-sky-700 border-0">Buscar</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-2xl bg-white/50 border-white/40">Filtros</Button>
                </DialogTrigger>
                <DialogContent className="backdrop-blur-2xl bg-white/70 border-white/50">
                  <DialogHeader>
                    <DialogTitle>Filtros rápidos</DialogTitle>
                  </DialogHeader>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      "Eco", "Frente al mar", "Spa", "Centro", "Pet-friendly", "Cafetería"].map((f) => (
                      <Button key={f} variant="secondary" className="bg-white/70 border-white/50 rounded-xl">{f}</Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Separator className="bg-white/40" />

          {/* Contenido principal */}
          <div className="grid lg:grid-cols-3 gap-6 p-4 sm:p-6">
            {/* Lista de hoteles */}
            <ScrollArea className="h-[72vh] lg:col-span-1 pr-2">
              <div className="grid gap-4">
                {filtered.map((h) => (
                  <Card key={h.id} className={`overflow-hidden border-white/40 bg-white/30 backdrop-blur-xl hover:bg-white/40 transition ${activeHotel.id===h.id?"ring-2 ring-emerald-400/60":""}`}>
                    <div className="flex">
                      <img src={h.thumbnail} alt={h.name} className="w-32 h-32 object-cover" />
                      <div className="flex-1 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold leading-tight">{h.name}</h3>
                            <div className="text-sm opacity-80 flex items-center gap-1"><MapPin className="w-4 h-4" />{h.location}</div>
                          </div>
                          <StarRating value={h.rating} />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {h.tags.map((t) => (<Tag key={t}>{t}</Tag>))}
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-sm opacity-80">Desde <b>€{h.priceFrom}</b>/noche</div>
                          <Button size="sm" className="rounded-xl bg-gradient-to-r from-emerald-600 to-sky-700 border-0" onClick={() => setActiveHotel(h)}>Ver</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            {/* Detalle del hotel seleccionado */}
            <div className="lg:col-span-2">
              <Card className="border-white/40 bg-white/30 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <GlassIcon Icon={BedDouble} />
                    <div>
                      <CardTitle className="text-2xl">{activeHotel.name}</CardTitle>
                      <div className="text-sm opacity-80 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {activeHotel.location}
                        <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> Check‑in 15:00 • Check‑out 12:00</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="servicios" className="w-full">
                    <TabsList className="bg-white/50 border-white/50">
                      <TabsTrigger value="servicios">Servicios</TabsTrigger>
                      <TabsTrigger value="habitaciones">Habitaciones</TabsTrigger>
                      <TabsTrigger value="menu">Menú del hotel</TabsTrigger>
                      <TabsTrigger value="fotos">Fotos</TabsTrigger>
                      <TabsTrigger value="quehacer">Qué hacer</TabsTrigger>
                      <TabsTrigger value="restaurantes">Restaurantes cerca</TabsTrigger>
                      <TabsTrigger value="comollegar">Cómo llegar</TabsTrigger>
                      <TabsTrigger value="largo">Alquiler largo plazo</TabsTrigger>
                    </TabsList>

                    {/* Servicios */}
                    <TabsContent value="servicios" className="mt-4">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {activeHotel.services.map((s, i) => (
                          <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/40 px-3 py-2 backdrop-blur-xl">
                            <s.icon className="w-5 h-5" />
                            <span>{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Habitaciones */}
                    <TabsContent value="habitaciones" className="mt-4 space-y-3">
                      {activeHotel.rooms.map((r, i) => (
                        <div key={i} className="rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl p-4">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="font-medium flex items-center gap-2"><BedDouble className="w-5 h-5" />{r.type}</div>
                            <div className="text-sm opacity-80">{r.beds} • {r.size} m²</div>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {r.perks.map((p) => (<Tag key={p}>{p}</Tag>))}
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button className="rounded-xl bg-gradient-to-r from-emerald-600 to-sky-700 border-0">Reservar</Button>
                            <Button variant="outline" className="rounded-xl bg-white/60 border-white/50">Ver detalles</Button>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    {/* Menú del hotel */}
                    <TabsContent value="menu" className="mt-4 grid sm:grid-cols-2 gap-3">
                      {activeHotel.menu.map((m, i) => (
                        <div key={i} className="rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-2"><Utensils className="w-5 h-5" /><span>{m.name}</span>{m.tag && <Badge className="ml-2 bg-amber-600 border-0">{m.tag}</Badge>}</div>
                          <div className="font-medium">€{m.price}</div>
                        </div>
                      ))}
                    </TabsContent>

                    {/* Fotos */}
                    <TabsContent value="fotos" className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {activeHotel.photos.map((src, i) => (
                        <img key={i} src={src} alt={`Foto ${i+1}`} className="w-full h-44 object-cover rounded-2xl border border-white/40 shadow" />
                      ))}
                    </TabsContent>

                    {/* Qué hacer */}
                    <TabsContent value="quehacer" className="mt-4 grid sm:grid-cols-2 gap-3">
                      {activeHotel.nearby.do.map((item, i) => (
                        <div key={i} className="rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3"><item.icon className="w-5 h-5" /><span className="font-medium">{item.title}</span></div>
                          <span className="text-sm opacity-80"><Timer className="w-4 h-4 inline mr-1" />{item.tip}</span>
                        </div>
                      ))}
                    </TabsContent>

                    {/* Restaurantes cercanos */}
                    <TabsContent value="restaurantes" className="mt-4 space-y-3">
                      {activeHotel.nearby.food.map((r, i) => (
                        <div key={i} className="rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3"><Utensils className="w-5 h-5" /><span className="font-medium">{r.name}</span><Badge className="bg-white/60 text-black border-white/40">{r.distance}</Badge></div>
                          <StarRating value={r.score} />
                        </div>
                      ))}
                    </TabsContent>

                    {/* Cómo llegar */}
                    <TabsContent value="comollegar" className="mt-4 grid lg:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        {activeHotel.nearby.transport.howTo.map((h, i) => (
                          <div key={i} className="rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl p-3 flex items-center gap-3">
                            <h.icon className="w-5 h-5" />
                            <span>{h.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="rounded-2xl overflow-hidden border border-white/40 bg-white/40 backdrop-blur-xl">
                        <iframe title="mapa" src={activeHotel.nearby.transport.mapEmbed} className="w-full h-64" loading="lazy" />
                      </div>
                    </TabsContent>

                    {/* Alquiler largo plazo */}
                    <TabsContent value="largo" className="mt-4">
                      <div className="rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h4 className="font-semibold">Estancias largas</h4>
                            <p className="text-sm opacity-80">Mínimo {activeHotel.nearby.longStay.minNights} noches • Desde <b>€{activeHotel.nearby.longStay.monthlyFrom}</b>/mes</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {activeHotel.nearby.longStay.perks.map((p) => (<Tag key={p}>{p}</Tag>))}
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button className="rounded-xl bg-gradient-to-r from-emerald-600 to-sky-700 border-0">Solicitar cotización</Button>
                          <Button variant="outline" className="rounded-xl bg-white/60 border-white/50">Contactar ventas</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Buscador por IA */}
              <Card className="mt-6 border-white/40 bg-white/30 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <GlassIcon Icon={MessageSquare} />
                    <div>
                      <CardTitle>Buscador por IA</CardTitle>
                      <p className="text-sm opacity-80">Consulta sobre hoteles, reseñas y recomendaciones.</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2">
                    <Textarea value={aiQuery} onChange={(e)=>setAiQuery(e.target.value)} placeholder="Ej.: ¿Qué hotel tiene mejor spa y opción mensual?" className="bg-white/60 border-white/50" />
                    <Button onClick={askAI} className="h-10 mt-0.5 rounded-xl bg-gradient-to-r from-emerald-600 to-sky-700 border-0 whitespace-nowrap">Preguntar</Button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {aiResponses.map((r) => (
                      <div key={r.id} className="rounded-2xl border border-white/40 bg-white/50 backdrop-blur-xl p-3">
                        <div className="text-xs uppercase opacity-70 mb-1">Consulta</div>
                        <div className="font-medium mb-2">{r.q}</div>
                        <div className="text-sm leading-relaxed"><span className="font-semibold">IA:</span> {r.a}</div>
                      </div>
                    ))}
                    {!aiResponses.length && (
                      <div className="text-sm opacity-70">Escribe una consulta y presiona <em>Preguntar</em>. Integra tu API/LLM en <code>askAI()</code>.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Pie */}
        <div className="text-center text-xs opacity-70 mt-4">
          <span className="inline-flex items-center gap-1">Hecho con estilo <em>AeroGlass</em> <PenSquare className="w-3 h-3" /> • paleta verde/azul/café</span>
        </div>
      </div>
    </div>
  );
}
