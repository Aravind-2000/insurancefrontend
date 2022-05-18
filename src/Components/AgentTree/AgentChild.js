import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";
const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

function AgentChild({ data }) {
  const [agent, setagent] = useState("");
  const [agentshow, setagentshow] = useState(false);

  const agentDisplay = (agentId) => {
    setagent(agentId);
    setagentshow(!agentshow);
  };
  return (
      <>
        {data?.map((agents, index) => {
          return (
              <>

                <TreeNode
                    key={index}
                    label={
                      <StyledNode onClick={() => agentDisplay(agents.id)}>
                        <>
                          <b>Name: </b> {agents?.client?.givenName}
                          <br />
                          <span>
                      {" "}
                            <b>Agent Type: </b>
                            {agents?.agentTypeLevel?.agentLevelDesc}
                    </span>
                        </>
                      </StyledNode>
                    }
                >
                  {agent === agents.id && agentshow  ? (
                      <>
                        {agents.downLevelAgents != 0 ? (
                            <AgentChild
                                data={agents.downLevelAgents}
                                agent={agent}
                                agentshow={agentshow}
                                agentDisplay={agentDisplay}
                            />
                        ) : null}
                      </>
                  ) : null}
                </TreeNode>
              </>
          );
        })}
      </>
  );
}

export default AgentChild;
