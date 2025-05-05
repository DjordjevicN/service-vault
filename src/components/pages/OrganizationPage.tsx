import Avatar from "../Avatar";
import { users } from "@/data/userData";

import OrgMember from "../OrgMember";
import { meets } from "@/data/meetData";

import GroupListingItem from "../GroupListingItem";

const OrganizationPage = () => {
  const sortUsersByRank = (users) => {
    const rankOrder = [
      "President",
      "Vice President",
      "Sergeant-at-Arms",
      "Road Captain",
      "Full Patch Member",
      "Prospect",
      "Hangaround",
    ];

    return users.sort(
      (a, b) => rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank)
    );
  };
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4 mt-14">
      <div className="">
        <div className="bg-gray70">
          <img
            className="w-full "
            src="https://www.moto-berza.com/images/vesti/img/1155918329329.jpg"
            alt=""
          />
        </div>
        <div className="flex items-center justify-between gap-4 p-6 mt-6 bg-gray80">
          <div className="text-center">
            <p>6</p>
            <p>Meets</p>
          </div>
          <div className="text-center">
            <p>30</p>
            <p>Members</p>
          </div>
          <div className="text-center">
            <p>30k</p>
            <p>Followers</p>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_5fr] p-6 text-white bg-gray80 mt-6">
          <div>
            <Avatar url="https://www.moto-berza.com/images/vesti/img/1155918329329.jpg" />
          </div>
          <div className="">
            <div className="flex justify-between items-center">
              <p className="text-xl">Arhangel Srbija</p>
              <button className="text-gradient text-sm">Edit profile</button>
            </div>
            <div className="text-gray55 mt-3 text-sm">
              <p>nikola.dj.87@gmail.com</p>
              <p>Belgrade, RS</p>
              <p>Joined Rider Meets on Jan 2018</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-gray80 rounded p-6">
          <h2 className="text-xl text-white font-bold">Members</h2>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {/* <div className="flex flex-wrap gap-4 mt-6"> */}
            {sortUsersByRank(users).map((user) => {
              return <OrgMember user={user} />;
            })}
          </div>
        </div>
        <div className="bg-gray80 rounded p-6 mt-6">
          <h2 className="text-xl text-white font-bold mb-6">Events</h2>
          <div>
            {meets.map((meet) => {
              return <GroupListingItem meet={meet} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;
