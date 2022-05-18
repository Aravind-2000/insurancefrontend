import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";
import AgentChild from "./AgentChild";
const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

function ChildNodes({ data, agentData, parentNode }) {
  const [office, setoffice] = useState("");
  const [officeshow, setofficeshow] = useState(false);

  const officeDisplay = (officeId) => {
    setoffice(officeId);
    setofficeshow(!officeshow);
  };
  const [agent, setagent] = useState("");
  const [agentshow, setagentshow] = useState(false);

  const agentDisplay = (agentId) => {
    setagent(agentId);
    setagentshow(!agentshow);
  };

  console.log(parentNode, agentData, "parentName");
  return (
      <>
        {data?.map((values, index) => {
          return (
              <>
                <TreeNode
                    key={index}
                    label={
                      <StyledNode onClick={() => officeDisplay(values.officeId)}>
                        <>
                          <b>
                            {values?.officeLevelParam?.officeLevelDesc.toUpperCase()}:{" "}
                          </b>{" "}
                          {values.officeName}
                          <br />
                          <span>
                      {" "}
                            <b>No of DownLevelOffice: </b>
                            {values?.downLevelOffice?.length}
                    </span>
                        </>
                      </StyledNode>
                    }
                >
                  {office === values.officeId && officeshow ? (
                      <>
                        {(values?.downLevelOffice &&
                            values?.downLevelOffice.length != 0) ||
                        (values?.agents && values?.agents.length != 0) ? (
                            <ChildNodes
                                data={values?.downLevelOffice}
                                agentData={values?.agents}
                                parentNode={values.officeName}
                            />
                        ) : null}
                      </>
                  ) : null}
                </TreeNode>
              </>
          );
        })}
        {agentData?.map((agents) => (
            <>
              {
                agents.upLevelAgentId === 0  ?
                    (
                        <TreeNode
                            lineWidth={"2px"}
                            lineColor={"green"}
                            lineBorderRadius={"10px"}
                            label={
                              <StyledNode onClick={() => agentDisplay(agents.id)}>
                                {
                                  <>
                                    <b>Name: </b> {agents?.client?.givenName}
                                    <br />
                                    <span>
                      {" "}
                                      <b>Agent Type: </b>
                                      {agents?.agentTypeLevel?.agentLevelDesc}
                    </span>
                                  </>
                                }
                              </StyledNode>
                            }
                        >
                          {agent === agents.id && agentshow ? (
                              <>
                                {agents.downLevelAgents != 0 ? (
                                    <AgentChild data={agents.downLevelAgents} />
                                ) : null}
                              </>
                          ) : null}
                        </TreeNode>
                    ) : null
              }
            </>
        ))}
      </>
  );
}

export default ChildNodes;
