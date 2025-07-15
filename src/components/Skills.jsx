import { BarChart2, Database, Activity, Settings, MessageCircle, Users } from "lucide-react";
import { motion } from "framer-motion";
export default function Skills() {
  const skills = [
    {
      title: "Technical Skills",
      items: [
        { name: "SQL", icon: Database },
        { name: "Excel", icon: Settings },
        { name: "Statistics", icon: BarChart2 },
        { name: "React js", icon: Activity }, 
        { name: "java", icon: Activity },
        { name: "C#", icon: Activity },
        { name: "Python", icon: Activity },
      ],
    },
    {
      title: "Tools",
      items: [
        { name: "Power BI", icon: BarChart2 },
        { name: "Tableau", icon: BarChart2 },
        { name: "SSIS", icon: Settings },
        { name: "Seal Report Designer", icon: Settings },
        { name: "Android Studio", icon: Settings },
        { name: "SQLSERVER", icon: Settings },
        { name: "Visual", icon: Settings },
     
      ],
    },
    {
      title: "Soft Skills",
      items: [
        { name: "Communication", icon: MessageCircle },
        { name: "Problem Solving", icon: Activity },
        { name: "Teamwork", icon: Users },
        { name: "Attention to Detail", icon: Database },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto" style={{ justifyContent: "center", alignContent: "center", height: "fit-content" }}>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8" style={{ color: "white" }} >Data Analyst Skills</h1>
        <div className="grid gap-10 md:grid-cols-3" style={{ marginLeft: "100px" }}>
          {skills.map((section) => (
            <div key={section.title} className="bg-white rounded-2xl shadow-md p-6" style={{ color: "white" }}>
              <h2 className="text-xl font-semibold text-gray-700 mb-4" style={{ color: "white", fontSize: "1.7rem" }} >{section.title}</h2>
              <ul className="space-y-4" style={{ color: "white", fontSize: "1.4rem" }} >
                {section.items.map(({ name, icon: Icon }, index) => (
                  <motion.li
                    key={name}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <li key={name} className="flex items-center space-x-3" >
                      <Icon className="text-blue-600 w-5 h-5" />
                      <span className="text-gray-600" style={{ marginLeft: "5px" }} >{name}</span>
                    </li>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
