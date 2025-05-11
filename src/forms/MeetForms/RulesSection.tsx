import Textarea from "@/components/UI/Textarea";
import { useState } from "react";

const RulesSection = () => {
  const [rules, setRules] = useState<string[]>([""]);
  console.log(rules);

  const handleRuleChange = (value: string, index: number) => {
    const updatedRules = [...rules];
    updatedRules[index] = value;
    setRules(updatedRules);
  };

  const handleAddRule = () => {
    setRules([...rules, ""]);
  };

  const handleDeleteRule = (index: number) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
  };

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4">
      <div>
        <h2 className="text-white text-2xl">
          Let's set some <span className="text-gradient font-bold">Rules</span>
        </h2>
        <p className="text-gray55 mt-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ea?
          Accusantium, deleniti dolorum? Officiis fugit dolores at placeat ab
          nesciunt!
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {rules.map((rule, i) => (
          <div key={i} className="relative">
            <Textarea
              onChange={(value) => handleRuleChange(value as string, i)}
              value={rule}
              label={`Rule #${i + 1}`}
              rows={4}
              placeholder="Describe the rule"
            />
            {rules.length > 1 && (
              <button
                onClick={() => handleDeleteRule(i)}
                className="absolute top-2 right-2 text-gray55 cursor-pointer hover:text-red-500"
              >
                Remove rule #{i + 1}
              </button>
            )}
          </div>
        ))}

        <button
          onClick={handleAddRule}
          className="div-gradient text-white px-4 py-2 rounded-md"
        >
          + Add Rule
        </button>
      </div>
    </div>
  );
};

export default RulesSection;
