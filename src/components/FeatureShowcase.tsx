'use client';

import InteractiveFeature from './InteractiveFeature';

const featureData = [
    {
        title: 'SPATIAL AUDIO',
        description: '360-degree immersion that tracks your movement. Experience sound exactly where it should be in 3D space.',
        visualType: 'sound'
    },
    {
        title: 'TITANIUM DRIVERS',
        description: 'Dual-layer 50mm titanium diaphragms delivering surgical precision and distortion-free bass at any volume.',
        visualType: 'precision'
    },
    {
        title: 'ELITE CANCEL',
        description: 'Active hybrid noise cancellation that samples environmental noise 40,000 times per second.',
        visualType: 'immersion'
    },
    {
        title: '40H POWER',
        description: 'Ultra-efficient energy management providing 40 hours of playback on a single 30-minute charge.',
        visualType: 'precision'
    },
    {
        title: 'STUDIO COMFORT',
        description: 'Memory foam earcups wrapped in protein leather with a zero-gravity headband for all-day sessions.',
        visualType: 'immersion'
    }
] as const;

export default function FeatureShowcase() {
    return (
        <div className="relative z-10 bg-[#020205] py-24">
            <div className="container-zenith">
                {featureData.map((feature, index) => (
                    <InteractiveFeature
                        key={feature.title}
                        index={index}
                        {...feature}
                    />
                ))}
            </div>
        </div>
    );
}
