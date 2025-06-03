import { CheckIcon } from "lucide-react";
import { Button } from "./ui/Button";

type Plan = {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
};
// * Create unlimited events
// * Upload custom avatars, banners, and organization images
// * Priority support
// * Access from multiple devices
// * No ads
// * Early access to new features
const plans: Plan[] = [
  {
    name: "FREE",
    price: "$0/mo",
    features: [
      "Access to browse and join events",
      "Create up to 3 active events per month",
      "Choose from default avatars",
      "Basic support",
    ],
  },
  {
    name: "Pro",
    price: "$10/mo",
    features: [
      "Create up to 20 active events",
      "Upload custom avatars, banners, and organization images",
      "Priority support",
      "Early access to new features",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    features: [
      "Unlimited events",
      "Custom branding and features",
      "Dedicated support",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="standardMaxWidth mx-auto py-16 px-4  mt-60">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Pricing Plans</h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Choose a plan that fits your needs.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-lg p-6 shadow-md flex flex-col ${
              plan.popular ? "box-gradient" : "border-accent"
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
            <p className="text-3xl font-bold mb-6">{plan.price}</p>
            <ul className="mb-6 space-y-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center space-x-2">
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button>{plan.popular ? "Get Started" : "Select"}</Button>
          </div>
        ))}
      </div>
    </section>
  );
}
