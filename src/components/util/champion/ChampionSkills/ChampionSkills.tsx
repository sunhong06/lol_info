import React from "react";
import { ChampionInfoType } from "../../../../type/type";

import "../../../../scss/Champion/ChampionSkills.scss";

interface ChampionSkillsProps {
  info: ChampionInfoType;
}

function ChampionSkills({ info }: ChampionSkillsProps) {
  return (
    <>
      <h2>SKILLS</h2>
      <ul className="champ_skills">
        <li key={info[1].key} className="p_skill">
          <img
            src={`${process.env.PUBLIC_URL}/imgs/passive/${info[0]}_P.png`}
            alt={`${info[0]}Passive`}
          />
          <span className="skill_command">P</span>
        </li>
        <li className="q_skill">
          <img
            src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}Q.png`}
            alt={`${info[0]}q_Skill`}
          />
          <span className="skill_command">Q</span>
        </li>
        <li className="w_skill">
          <img
            src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}W.png`}
            alt={`${info[0]}w_Skill`}
          />
          <span className="skill_command">W</span>
        </li>
        <li className="e_skill">
          <img
            src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}E.png`}
            alt={`${info[0]}e_Skill`}
          />
          <span className="skill_command">E</span>
        </li>
        <li className="r_skill">
          <img
            src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}R.png`}
            alt={`${info[0]}r_Skill`}
          />
          <span className="skill_command">R</span>
        </li>
      </ul>
    </>
  );
}

export default ChampionSkills;
