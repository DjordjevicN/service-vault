import male from "@/assets/placeholderAvatars/male.webp";
import female from "@/assets/placeholderAvatars/female.webp";
import one from "@/assets/customAvatars/1.webp";
import two from "@/assets/customAvatars/2.webp";
import tree from "@/assets/customAvatars/3.webp";
import four from "@/assets/customAvatars/4.webp";
import five from "@/assets/customAvatars/6.webp";

export const avatarData = [
  {
    id: 1,
    backgroundColor: "#fff",
    subscriptionLevel: 1,
    url: male,
  },
  {
    id: 2,
    backgroundColor: "#ffffff",
    subscriptionLevel: 2,
    url: female,
  },
  {
    id: 3,
    backgroundColor: "#ffffff",
    subscriptionLevel: 3,
    url: one,
  },
  {
    id: 4,
    backgroundColor: "#ffffff",
    subscriptionLevel: 2,
    url: two,
  },
  {
    id: 5,
    backgroundColor: "#ffffff",
    subscriptionLevel: 2,
    url: tree,
  },
  {
    id: 6,
    backgroundColor: "#ffffff",
    subscriptionLevel: 2,
    url: four,
  },
  {
    id: 7,
    backgroundColor: "#ffffff",
    subscriptionLevel: 2,
    url: five,
  },
];

export const avatarDataDefault = {
  id: 99,
  backgroundColor: "#fff",
  subscriptionLevel: 3,
  url: female,
  borderColor: "#3ECB25",
  borderAnimationId: 3,
};
