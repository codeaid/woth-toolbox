'use client';

import { useEffect, useState } from 'react';
import {
    fetchUserHerds,
    fetchHerdAnimals,
    calculateCullingRecommendation,
    type HerdsResponse,
    type TrackedAnimal,
    type Herd
} from '../services/discordApiService';
interface HerdMapOverlayProps {
  currentMap?: string;
  onHerdsLoaded?: (herds: Herd[]) => void;
}

const MARKER_COLORS = {
  CULL: '#ff4444',
  LEAVE: '#44ff44',
  MONITOR: '#ffaa44',
  TROPHY: '#ffd700'
};

const MARKER_ICONS = {
  CULL: '❌',
  LEAVE: '✅',
  MONITOR: '⏳',
  TROPHY: '🏆'
};

export function HerdMapOverlay({ currentMap, onHerdsLoaded }: HerdMapOverlayProps) {
  const [herdsData, setHerdsData] = useState<HerdsResponse | null>(null);
  const [selectedHerds, setSelectedHerds] = useState<Set<number>>(new Set());
  const [animals, setAnimals] = useState<TrackedAnimal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHerds();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('selected_herds');
    if (saved) {
      try {
        setSelectedHerds(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Failed to load selected herds', e);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedHerds.size > 0) {
      localStorage.setItem('selected_herds', JSON.stringify([...selectedHerds]));
    }
  }, [selectedHerds]);

  async function loadHerds() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUserHerds();
      setHerdsData(data);

      if (data.herds && data.herds.length > 0 && onHerdsLoaded) {
        onHerdsLoaded(data.herds);
      }

      if (data.tracking_mode === 'habitat_wide' && data.habitats) {
        const allAnimals = data.habitats.flatMap(h => h.animals);
        setAnimals(allAnimals.map(a => ({
          ...a,
          culling_recommendation: calculateCullingRecommendation(
            a.age_class,
            a.star_rating,
            a.responds_to_caller
          )
        })));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load herds');
      console.error('Error loading herds:', err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleHerd(herdId: number) {
    const newSelected = new Set(selectedHerds);
    
    if (newSelected.has(herdId)) {
      newSelected.delete(herdId);
      setAnimals(prev => prev.filter(a => a.herd_id !== herdId));
    } else {
      newSelected.add(herdId);
      
      try {
        const { animals: herdAnimals } = await fetchHerdAnimals(herdId);
        const enriched = herdAnimals.map(a => ({
          ...a,
          culling_recommendation: calculateCullingRecommendation(
            a.age_class,
            a.star_rating,
            a.responds_to_caller
          )
        }));
        setAnimals(prev => [...prev, ...enriched]);
      } catch (err) {
        console.error('Failed to load herd animals:', err);
      }
    }
    
    setSelectedHerds(newSelected);
  }

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        zIndex: 1000
      }}>
        Loading your herds...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(255, 68, 68, 0.9)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        zIndex: 1000
      }}>
        {error}
      </div>
    );
  }

  if (!herdsData || (herdsData.tracking_mode === 'individual' && !herdsData.herds?.length)) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        zIndex: 1000
      }}>
        No herds tracked yet. Use /herd_manager in Discord!
      </div>
    );
  }

  const filteredHerds = herdsData.tracking_mode === 'individual' && currentMap
    ? herdsData.herds?.filter(h => h.map_name === currentMap)
    : herdsData.herds;

  const filteredAnimals = currentMap
    ? animals.filter(a => {
        if (herdsData.tracking_mode === 'individual' && a.herd_id) {
          const herd = herdsData.herds?.find(h => h.id === a.herd_id);
          return herd?.map_name === currentMap;
        }
        return true;
      })
    : animals;

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.9)',
        borderRadius: '8px',
        padding: '15px',
        maxWidth: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}>
        <h3 style={{ color: 'white', margin: '0 0 15px 0', fontSize: '16px' }}>
          🦌 Your Herds {currentMap && `(${currentMap})`}
        </h3>
        
        {herdsData.tracking_mode === 'individual' && filteredHerds && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredHerds.map(herd => (
              <label
                key={herd.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px',
                  background: selectedHerds.has(herd.id) ? 'rgba(88, 101, 242, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  transition: 'background 0.2s'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedHerds.has(herd.id)}
                  onChange={() => toggleHerd(herd.id)}
                  style={{ cursor: 'pointer' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
                    {herd.herd_name}
                  </div>
                  <div style={{ color: '#aaa', fontSize: '12px' }}>
                    {herd.species_name} • {herd.animal_count} animals
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}

        {herdsData.tracking_mode === 'habitat_wide' && (
          <div style={{ color: 'white', fontSize: '14px' }}>
            <p>Habitat-Wide tracking active</p>
            <p style={{ color: '#aaa', fontSize: '12px' }}>
              {filteredAnimals.length} animals tracked
            </p>
          </div>
        )}

        <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #444' }}>
          <div style={{ color: 'white', fontSize: '12px', marginBottom: '8px' }}>Legend:</div>
          {Object.entries(MARKER_ICONS).map(([key, icon]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '16px' }}>{icon}</span>
              <span style={{ color: MARKER_COLORS[key as keyof typeof MARKER_COLORS], fontSize: '12px' }}>
                {key}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div id="tracked-animals-overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 999
      }}>
        {filteredAnimals.map((animal, index) => (
          <div
            key={`${animal.id}-${index}`}
            className="animal-marker"
            data-recommendation={animal.culling_recommendation}
            data-species={animal.species_name}
            data-location={animal.location_notes}
            data-stars={animal.star_rating}
            data-age={animal.age_class}
            style={{
              position: 'absolute',
              fontSize: '24px',
              pointerEvents: 'all',
              cursor: 'pointer',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
            }}
            title={`${animal.species_name} - ${'⭐'.repeat(animal.star_rating)} ${animal.age_class}\n${animal.location_notes}\nRecommendation: ${animal.culling_recommendation}`}
          >
            {MARKER_ICONS[animal.culling_recommendation || 'MONITOR']}
          </div>
        ))}
      </div>
    </>
  );
}
