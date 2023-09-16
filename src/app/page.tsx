"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

import { set, ref, onValue } from "firebase/database"
import { rtdb } from "../firebase"

import { Switch } from "@/components/ui/switch"

import { SunIcon } from '@radix-ui/react-icons'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { MainNav } from "@/components/main-nav"
import { EntryRegister } from "@/components/entry-register"
import { UserNav } from "@/components/user-nav"
import { Skeleton } from "@/components/ui/skeleton"

type List = {
  Luces: string,
  "Nivel de Oscuridad": number,
  acceso:   boolean,
  entradas: any,
  led:  number
}

export default function Home() {
  const [list, setList] = useState<List>({
    Luces: "",
    "Nivel de Oscuridad": 0,
    acceso:   false,
    entradas: 0,
    led:  0
  });
  

  useEffect(() => {
    const bar = document.getElementById("barpercentage");
    if (bar) {
      bar.style.width = `${Math.round((list["Nivel de Oscuridad"] - 1024) / (727 - 1024) * 100)}%`;
    }
  }, [list?.["Nivel de Oscuridad"]]);

  useEffect(() => {
    const getList = async () => {
      try {
        const entriesRef = ref(rtdb, '/');
        onValue(entriesRef, (snapshot) => {
            const data = snapshot.val();
            setList(data);
        });
      } catch (err) { 
        console.error(err);
      }
    };

    getList();
    
    const switchbutton = document.getElementById("switchLight");
    

    switchbutton?.addEventListener('click', function handleClick(event) {
      try {
        const target = event.target as HTMLElement;
        if (target.getAttribute('aria-checked') == "false") {
          writeUserData(1);
        } else {
          writeUserData(0);
        }
      } catch (err) {
        console.error(err);
      };
      return false;
    })
    
  }, []);

  function writeUserData(int: any) {
    set(ref(rtdb, 'led/'), int);
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 grid-flow-col grid-rows-3 min-h-0 h-[32rem]">
                
                <Card className="col-span-2 row-span-3 overflow-auto">
                  <CardHeader className="sticky top-0 -ml-0.5 pointer-events-none bg-gradient-to-b from-white from-75%">
                    <CardTitle className="">Registro de entradas</CardTitle>
                    <CardDescription className="">
                      
                    </CardDescription>
                  </CardHeader>
                  <CardContent>                    
                    <EntryRegister entryList = {list}/>                    
                  </CardContent>
                </Card>

                <Card className="col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Luminosidad del ambiente
                    </CardTitle>  
                    <SunIcon />
                  </CardHeader>
                  <CardContent className="mt-3">
                    { list?.["Nivel de Oscuridad"] == undefined ? (
                      <div className="flex items-center" > 
                          <div className="ml-4 space-y-1">
                          <Skeleton className="w-[250px] h-[20px] rounded-full" />  
                          </div>   
                      </div>
                    ) : (
                      <>
                      <div className="text-2xl font-bold">{Math.round((list?.["Nivel de Oscuridad"]-1024)/(750-1024)*100)}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-3">
                        <div id ="barpercentage" className="bg-blue-600 h-2.5 rounded-full" ></div>  
                      </div>
                      </>
                    )}
                    
                  </CardContent>
                </Card>

                <Card className="row-span-2 col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Control
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent className="mt-6">
                    <div className="text-2xl font-bold"></div>
                    <div className="items-top flex space-x-2 flex-row space-y-2 justify-between items-center">                      
                      <div className="flex ">
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="switchLight"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Estado de foco
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Si la iluminosidad es mayor al 50% se activara el ahorro de energia
                          </p>
                        </div>
                        
                      </div>
                      <div className="items-center flex">
                            { list?.led === 0 ? (
                              <>
                              <Switch  id="switchLight" aria-checked="false"/>
                              <p id="switchLabel" className="ml-2 w-6">Off</p>
                              </>
                            ) : (
                              <>
                              <Switch  id="switchLight" aria-checked="true"/> 
                              <p id="switchLabel" className="ml-2 w-6">On</p>
                              </>
                            )}
                      </div>
                    </div>     
                                   
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}