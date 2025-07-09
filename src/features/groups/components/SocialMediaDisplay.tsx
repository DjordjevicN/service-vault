import instagram from "@/assets/socialMedia/instagram.svg";
import facebook from "@/assets/socialMedia/facebook.svg";
import twitter from "@/assets/socialMedia/twitter.svg";
import youtube from "@/assets/socialMedia/youtube.svg";
import tiktok from "@/assets/socialMedia/tiktok.svg";
import customLink from "@/assets/socialMedia/customLink.svg";

const iconMap: Record<string, string> = {
  instagram,
  facebook,
  twitter,
  youtube,
  tiktok,
  customLink,
};

const SocialMediaDisplay = ({
  links,
  size = "medium",
}: {
  links: Partial<Record<keyof typeof iconMap, string>>;
  size?: "small" | "medium" | "large";
}) => {
  const sizeClasses = {
    small: "w-[16px]",
    medium: "w-[24px]",
    large: "w-[40px]",
  };
  return (
    <div className="flex items-center gap-6 mt-2">
      {Object.entries(links).map(([platform, url]) => {
        const icon = iconMap[platform];
        if (!url || !icon) return null;
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className={sizeClasses[size]} src={icon} alt={platform} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaDisplay;
