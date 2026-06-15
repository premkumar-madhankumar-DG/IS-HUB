import {
  FaFolder,
  FaUsers,
  FaRocket,
  FaGlobe,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaFolder />,
    value: "120+",
    title: "Projects Delivered",
  },
  {
    icon: <FaUsers />,
    value: "50+",
    title: "Team Members",
  },
  {
    icon: <FaRocket />,
    value: "8+",
    title: "Years Journey",
  },
  {
    icon: <FaGlobe />,
    value: "20+",
    title: "Countries Served",
  },
];

function Stats() {
  return (
    <section className="py-10">
      <div className="container-custom grid md:grid-cols-4 gap-6">

        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl p-6 shadow hover:-translate-y-2 transition"
          >
            <div className="text-blue-600 text-3xl">
              {item.icon}
            </div>

            <h3 className="text-3xl font-bold mt-3">
              {item.value}
            </h3>

            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;