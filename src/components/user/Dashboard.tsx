import BikeCard from "../bike/BikeCard";
const myBikes = [1, 2, 3, 6, 7, 8];
const Dashboard = () => {
  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5">
        {myBikes.map((bike) => {
          return <BikeCard key={bike} />;
        })}
      </div>

      <p>+ add new bike</p>
    </div>
  );
};

export default Dashboard;
