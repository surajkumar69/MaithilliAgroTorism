'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Stepper } from '@/components/ui/Stepper';
import { Card, CardContent } from '@/components/ui/Card';

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-earth-50 text-forest-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-20">
        <header className="space-y-4">
          <h1 className="text-5xl font-serif text-forest-900 reveal is-visible">Design System</h1>
          <p className="text-xl text-forest-700 reveal is-visible reveal-stagger-1">
            Typography, colors, components, and motion primitives for Maithili Agro Tourism.
          </p>
        </header>

        <section className="space-y-8 reveal is-visible reveal-stagger-2">
          <h2 className="text-3xl font-serif border-b border-forest-200 pb-2">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-forest-900 shadow-sm"></div>
              <p className="text-sm font-medium">Forest 900</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-forest-700 shadow-sm"></div>
              <p className="text-sm font-medium">Forest 700</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-earth-50 shadow-sm border border-forest-100"></div>
              <p className="text-sm font-medium">Earth 50 (Bg)</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-accent-gold shadow-sm"></div>
              <p className="text-sm font-medium">Accent Gold</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-accent-leaf shadow-sm"></div>
              <p className="text-sm font-medium">Accent Leaf</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-accent-warm shadow-sm"></div>
              <p className="text-sm font-medium">Accent Warm</p>
            </div>
          </div>
        </section>

        <section className="space-y-8 reveal is-visible reveal-stagger-3">
          <h2 className="text-3xl font-serif border-b border-forest-200 pb-2">Typography</h2>
          <div className="space-y-6">
            <div>
              <h1 className="text-6xl font-serif">Heading 1 (Playfair)</h1>
              <p className="text-sm text-forest-600 mt-2">font-serif text-6xl</p>
            </div>
            <div>
              <h2 className="text-4xl font-serif">Heading 2 (Playfair)</h2>
              <p className="text-sm text-forest-600 mt-2">font-serif text-4xl</p>
            </div>
            <div>
              <h3 className="text-2xl font-serif">Heading 3 (Playfair)</h3>
              <p className="text-sm text-forest-600 mt-2">font-serif text-2xl</p>
            </div>
            <div>
              <p className="text-base text-forest-800 leading-relaxed max-w-2xl">
                Body text (Plus Jakarta Sans). Maithili Agro Tourism is selling a feeling — hills, soil, open air — and a geometric UI sans cannot carry it. A variable serif for display plus a variable sans for UI is the difference between "modern and natural" and "a booking form".
              </p>
              <p className="text-sm text-forest-600 mt-2">font-sans text-base leading-relaxed</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-serif border-b border-forest-200 pb-2">Components</h2>
          
          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Buttons</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button>Primary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button isLoading>Loading</Button>
              </div>
            </div>

            <div className="space-y-4 max-w-sm">
              <h3 className="text-xl font-medium">Inputs (Floating Label)</h3>
              <Input label="Your Name" type="text" />
              <Input label="Phone Number" type="tel" />
            </div>

            <div className="space-y-4 max-w-sm">
              <h3 className="text-xl font-medium">Stepper</h3>
              <div className="bg-white p-4 rounded-3xl border border-forest-100 shadow-sm">
                <Stepper 
                  label="Adults" 
                  description="12+ years"
                  value={2} 
                  onChange={() => {}} 
                />
                <div className="h-px bg-forest-100 my-2" />
                <Stepper 
                  label="Children" 
                  description="5-12 years"
                  value={0} 
                  onChange={() => {}} 
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Cards</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <Card>
                  <div className="aspect-[4/3] bg-forest-200"></div>
                  <CardContent className="space-y-2">
                    <h4 className="text-xl font-serif">Overnight Stay</h4>
                    <p className="text-forest-700 text-sm">Experience the peace of Sahyadri mountains with our comfortable AC rooms.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
