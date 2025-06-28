'use client';

import { MassGuideOptions } from '@/types/massGuide';

interface MassGuideCustomizerProps {
  options: MassGuideOptions;
  onOptionsChange: (options: MassGuideOptions) => void;
}

export default function MassGuideCustomizer({ options, onOptionsChange }: MassGuideCustomizerProps) {
  const handleOptionChange = (category: keyof MassGuideOptions, value: string) => {
    onOptionsChange({
      ...options,
      [category]: value
    });
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg mb-5">
      <h1 className="text-2xl font-bold mb-4 text-amber-900">Customize Your Mass Guide</h1>
      <p className="mb-6 text-gray-700">Select the versions your church uses, then the guide will update automatically.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <OptionGroup
            title="Greeting (after Sign of the Cross)"
            name="greeting"
            value={options.greeting}
            onChange={(value) => handleOptionChange('greeting', value)}
            options={[
              { value: 'grace', label: '"The grace of our Lord Jesus Christ, and the love of God, and the communion of the Holy Spirit be with you all."' },
              { value: 'peace', label: '"Grace to you and peace from God our Father and the Lord Jesus Christ."' },
              { value: 'lord', label: '"The Lord be with you."' }
            ]}
          />

          <OptionGroup
            title="Penitential Act"
            name="penitential"
            value={options.penitential}
            onChange={(value) => handleOptionChange('penitential', value)}
            options={[
              { value: 'confiteor', label: '"I confess to almighty God..." (Confiteor)' },
              { value: 'mercy', label: '"Have mercy on us, O Lord..."' },
              { value: 'invocations', label: '"You were sent to heal the contrite of heart..." (Invocations)' }
            ]}
          />

          <OptionGroup
            title="Kyrie"
            name="kyrie"
            value={options.kyrie}
            onChange={(value) => handleOptionChange('kyrie', value)}
            options={[
              { value: 'english', label: '"Lord, have mercy" (English)' },
              { value: 'latin', label: '"Kyrie, eleison" (Latin)' },
              { value: 'skip', label: 'Skip Kyrie (not used at your church)' }
            ]}
          />

          <OptionGroup
            title="Gloria"
            name="gloria"
            value={options.gloria}
            onChange={(value) => handleOptionChange('gloria', value)}
            options={[
              { value: 'include', label: 'Include Gloria' },
              { value: 'skip', label: 'Skip Gloria (note when it\'s used)' }
            ]}
          />

          <OptionGroup
            title="Creed"
            name="creed"
            value={options.creed}
            onChange={(value) => handleOptionChange('creed', value)}
            options={[
              { value: 'nicene', label: 'Niceno-Constantinopolitan Creed (longer)' },
              { value: 'apostles', label: 'Apostles\' Creed (shorter)' },
              { value: 'both', label: 'Include both (show which is used when)' }
            ]}
          />
        </div>

        <div className="space-y-6">
          <OptionGroup
            title="Mystery of Faith (after Consecration)"
            name="mystery"
            value={options.mystery}
            onChange={(value) => handleOptionChange('mystery', value)}
            options={[
              { value: 'proclaim', label: '"We proclaim your Death, O Lord..."' },
              { value: 'eat', label: '"When we eat this Bread and drink this Cup..."' },
              { value: 'save', label: '"Save us, Saviour of the world..."' }
            ]}
          />

          <OptionGroup
            title="Prayer of the Faithful Response"
            name="faithful"
            value={options.faithful}
            onChange={(value) => handleOptionChange('faithful', value)}
            options={[
              { value: 'mercy', label: '"Lord, in your mercy. Hear our prayer."' },
              { value: 'short', label: '"Lord, hear our prayer."' }
            ]}
          />

          <OptionGroup
            title="Holy, Holy, Holy (Sanctus)"
            name="sanctus"
            value={options.sanctus}
            onChange={(value) => handleOptionChange('sanctus', value)}
            options={[
              { value: 'english', label: 'English version' },
              { value: 'latin', label: 'Latin version (Sanctus)' },
              { value: 'both', label: 'Include both versions' }
            ]}
          />

          <OptionGroup
            title="Lamb of God (Agnus Dei)"
            name="agnus"
            value={options.agnus}
            onChange={(value) => handleOptionChange('agnus', value)}
            options={[
              { value: 'english', label: 'English version' },
              { value: 'latin', label: 'Latin version (Agnus Dei)' },
              { value: 'both', label: 'Include both versions' }
            ]}
          />

          <OptionGroup
            title="Dismissal"
            name="dismissal"
            value={options.dismissal}
            onChange={(value) => handleOptionChange('dismissal', value)}
            options={[
              { value: 'ended', label: '"Go forth, the Mass is ended."' },
              { value: 'announce', label: '"Go and announce the Gospel of the Lord."' },
              { value: 'glorify', label: '"Go in peace, glorifying the Lord by your life."' },
              { value: 'peace', label: '"Go in peace."' }
            ]}
          />
        </div>
      </div>
    </div>
  );
}

interface OptionGroupProps {
  title: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function OptionGroup({ title, name, value, onChange, options }: OptionGroupProps) {
  return (
    <div className="p-4 bg-gray-50 rounded border-l-4 border-amber-700">
      <h3 className="text-amber-900 font-semibold mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start p-2 bg-white border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="mr-2 mt-1 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}