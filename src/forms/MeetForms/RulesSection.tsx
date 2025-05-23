import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { addRule, deleteRule, updateRule } from "@/store/meetFormSlice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const RulesSection = () => {
  const dispatch = useDispatch();
  const rules = useSelector((state: RootState) => state.meetForm.rules);

  // Handle rule changes
  const handleRuleChange = (value: string, index: number) => {
    dispatch(updateRule({ value, index }));
  };

  // Add a new rule
  const handleAddRule = () => {
    dispatch(addRule());
  };

  // Delete a rule
  const handleDeleteRule = (index: number) => {
    dispatch(deleteRule(index));
  };

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 mt-4">
      <Card className="px-6">
        <div>
          <h2 className="text-white">
            Let's set some <span className="text-gradient">Rules</span>
          </h2>
          <p className="text-gray55 mt-4 mb-20">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ea?
            Accusantium, deleniti dolorum? Officiis fugit dolores at placeat ab
            nesciunt!
          </p>
        </div>
      </Card>
      <Card className="px-6">
        <div className="flex flex-col gap-4">
          {rules.map((rule, i) => (
            <div key={i} className="relative">
              <Textarea
                onChange={(e) => handleRuleChange(e.target.value as string, i)}
                value={rule}
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

          <Button onClick={handleAddRule}>+ Add Rule</Button>
        </div>
      </Card>
    </div>
  );
};

export default RulesSection;
