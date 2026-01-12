
import React from 'react';
import { Topic } from './types';

export const SYLLABUS_CONTEXT = `
Temario Claudia López García - 3º Educación Primaria:

1. Fuenteovejuna (Lope de Vega):
   - Personajes: Laurencia (evolución, rebeldía), Frondoso (galán), Comendador (tirano, mal poder), Pueblo (personaje colectivo).
   - Estructura: Historia principal (villanos vs comendador) y secundaria (toma de Ciudad Real).
   - Temas: Amor (lícito vs ilícito/ferus), Honor (alma) y Honra (opinión externa). Oposición binaria.
   - Recursos: Deus ex machina (Reyes), Anagnórisis doble.

2. El Lazarillo de Tormes:
   - Tratados: 1 (Ciego), 2 (Clérigo), 3 (Escudero), 4 (Fraile), 5 (Buldero), 6 (Capellán), 7 (Alguacil/Arcipreste).
   - Temas: Supervivencia, hambre (desaparece al final), hipocresía, crítica a la iglesia.
   - Forma: Epistolar (Vuesa Merced). Sociedad estamental.
   - Autoría: Desconocido (teoría Rosa Navarro Durán). Descubrimiento en Barcarrota (1992).

3. Lo que el español esconde:
   - Variación Diatópica (lugar), Diastrática (clase), Diafásica (situación).
   - Influencia popular: Narcos (Colombia), Reguetón (neologismos).
   - Unidad vs Fragmentación (Valera vs Cuervo). Anglicismos.

4. Gramática Española:
   - Sincronía vs Diacronía.
   - El Signo Lingüístico: Pierce (Objeto, Forma, Intérprete), Saussure (Significado/Significante).
   - Características: Arbitrariedad, Biplánico, Lineal, Mutabilidad, Doble Articulación.
   - Fenómenos de contacto: Sustrato, Superestrato, Adstrato.

5. Estudios Literarios:
   - Intertextualidad (Kristeva/Barthes): General, Restringida, Autotextualidad.
   - Concepto de Literatura: Mímesis (Aristóteles), Docere et Delectare (Horacio).
   - Tópicos Literarios: Locus Amoenus, Carpe Diem, Tempus Fugit, Cotidie Morimur, Religio Amoris, Theatrum Mundi, Homo Viator.
`;

export const TOPIC_COLORS: Record<Topic, string> = {
  [Topic.Fuenteovejuna]: 'bg-rose-100 text-rose-700 border-rose-200',
  [Topic.Lazarillo]: 'bg-amber-100 text-amber-700 border-amber-200',
  [Topic.EspanolEsconde]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  [Topic.Gramatica]: 'bg-blue-100 text-blue-700 border-blue-200',
  [Topic.EstudiosLiterarios]: 'bg-purple-100 text-purple-700 border-purple-200',
};
