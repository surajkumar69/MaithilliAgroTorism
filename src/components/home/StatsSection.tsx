'use client';

import React from 'react';
import { Statistic } from '@/lib/types';
import { INITIAL_STATS } from '@/lib/data';

interface StatsSectionProps {
  stats?: Statistic[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats = INITIAL_STATS }) => {
  return (
    <section className="py-16 bg-forest-950 text-white border-y border-forest-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-forest-800/80">
          {stats.map((stat, idx) => (
            <div key={stat.id || idx} className={`space-y-2 ${idx > 0 ? 'pt-6 lg:pt-0' : ''}`}>
              <div className="font-serif text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-white to-accent-leaf">
                {stat.valueNumber.toLocaleString()}
                <span className="text-accent-leaf text-3xl font-bold ml-1">{stat.suffix}</span>
              </div>
              <p className="text-xs sm:text-sm text-earth-300 font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
