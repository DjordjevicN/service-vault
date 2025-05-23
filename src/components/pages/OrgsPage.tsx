import { motoGP } from "@/data/motoGP";
import { Card, CardHeader } from "../ui/card";
import insta from "@/assets/socials/insta.svg";
import facebook from "@/assets/socials/facebook.svg";
import twitter from "@/assets/socials/twitter2.svg";
import website from "@/assets/socials/web.svg";

const OrgsPage = () => {
  const img =
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGdyb3VwfGVufDB8fHx8MTY5MjQ1NTQyNg&ixlib=rb-4.0.3&q=80&w=400";

  const groups = [
    { name: "Group 1", id: 1, image: img, events: [] },
    { name: "MotoGP", id: 2, image: img, events: motoGP },
  ];
  console.log(groups);
  return (
    <div className="mt-4">
      <Card>
        <CardHeader>Groups</CardHeader>
        <div className="flex items-center flex-wrap gap-4 px-6">
          {groups.map((group) => {
            return (
              <Card
                key={group.id}
                className="px-6 w-[320px] bg-accent cursor-pointer"
              >
                <div>
                  <div>
                    <p className="text-xl font-semibold">{group.name}</p>
                    <p className="text-xs text-muted-foreground font-light">
                      Dzonicam
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div className="text-sm text-muted-foreground flex flex-col gap-2">
                  <div className="text-xs text-white">
                    <p>Events: 22</p>
                    <p>Followers: 22</p>
                    <p>Members: 22</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      <img src={insta} alt="" />
                    </a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      <img src={facebook} alt="" />
                    </a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      <img src={twitter} alt="" />
                    </a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      <img src={website} alt="" />
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default OrgsPage;
