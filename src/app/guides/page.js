'use client'; // Indicates this is a client component
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#4D585B] flex flex-col p-8"> {/* Charcoal background */}
      {/* Centered title for Guides */}
      <h1 className="text-center text-4xl mt-8 mb-4 font-bold text-[#DBAE58]">Guides</h1>

      <div className="flex w-full"> {/* Allow tabs to take full width */}
        {/* Tabs with vertical orientation and charcoal background aligned to the left */}
        <Tabs
          aria-label="Options"
          isVertical={true}
          css={{
            backgroundColor: '#4D585B', // Charcoal background for tabs
            flex: '0 0 200px', // Fixed width for tabs (adjust as needed)
            border: '2px solid transparent', // No border around the tabs
          }}
        >
          <Tab key="glossary" title="Glossary">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Charcoal card background and flexible width */}
              <CardBody className="text-black"> {/* Black text */}
                Squirrels are members of the family Sciuridae (/sɪˈjuːrɪdeɪ, -diː/), a family that includes small or medium-sized rodents. The squirrel family includes tree squirrels, ground squirrels (including chipmunks and prairie dogs, among others), and flying squirrels. Squirrels are indigenous to the Americas, Eurasia, and Africa, and were introduced by humans to Australia.[1] The earliest known fossilized squirrels date from the Eocene epoch, and among other living rodent families, the squirrels are most closely related to the mountain beaver and dormice.[2]

                Etymology
                The word squirrel, first attested in 1327, comes from the Anglo-Norman esquirel which is from the Old French escurel, the reflex of a Latin word sciurus, which was taken from the Ancient Greek word σκίουρος (skiouros; from σκία-ουρος) 'shadow-tailed', referring to the long bushy tail which many of its members have.[3][4] Sciurus is also the name of one of its genuses.[4]

                The native Old English word for the squirrel, ācweorna, only survived into Middle English (as aquerne) before being replaced.[5] The Old English word is of Common Germanic origin, cognates of which are still used in other Germanic languages, including the German Eichhörnchen (diminutive of Eichhorn, which is not as frequently used); the Norwegian ikorn/ekorn; the Dutch eekhoorn; the Swedish ekorre and the Danish egern.

                A group of squirrels is called a "dray"[6] or a "scurry".[7]
              </CardBody>
            </Card>
          </Tab>
          <Tab key="pc-building" title="PC Building Process">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Charcoal card background and flexible width */}
              <CardBody className="text-black"> {/* Black text */}
                2
              </CardBody>
            </Card>
          </Tab>
          <Tab key="cpu" title="CPU">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Charcoal card background and flexible width */}
              <CardBody className="text-black"> {/* Black text */}
                3
              </CardBody>
            </Card>
          </Tab>
          <Tab key="cpu-cooler" title="CPU Cooler">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Charcoal card background and flexible width */}
              <CardBody className="text-black"> {/* Black text */}
                4
              </CardBody>
            </Card>
          </Tab>
          <Tab key="motherboard" title="Motherboard">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Charcoal card background and flexible width */}
              <CardBody className="text-black"> {/* Black text */}
                5
              </CardBody>
            </Card>
          </Tab>
          <Tab key="memory" title="Memory">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Charcoal card background and flexible width */}
              <CardBody className="text-black"> {/* Black text */}
                6
              </CardBody>
            </Card>
          </Tab>
          <Tab key="storage" title="Storage">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Charcoal card background and flexible width */}
              <CardBody className="text-black"> {/* Black text */}
                7
              </CardBody>
            </Card>
          </Tab>
          <Tab key="video-card" title="Video Card">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Charcoal card background and flexible width */}
              <CardBody className="text-black"> {/* Black text */}
                8
              </CardBody>
            </Card>
          </Tab>
          <Tab key="psu" title="PSU">
            <Card css={{ backgroundColor: '#4D585B', flex: 1 }}> {/* Charcoal card background and flexible width */}
              <CardBody className="text-black"> {/* Black text */}
                9
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
