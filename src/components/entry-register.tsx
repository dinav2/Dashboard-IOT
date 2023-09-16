import { Skeleton } from "@/components/ui/skeleton" 

export function EntryRegister(entryList: any) {
    const registeredNames: Record<string, string> = {
        "DC D2 D0 DB": "David Gomez",
        "BD E2 FF D9": "Diego Calvario",
        "73 8A 95 79": "Sebastian Pulido"
    };

    function checkRegistration(inputString: string): string {
        if (registeredNames.hasOwnProperty(inputString)) {
            return registeredNames[inputString];
        } else {
            return "Not registered"
        }
    }

    return (
      <div className="space-y-8">
        {
        (entryList.entryList.length === 0 || entryList.entryList.entradas.length === 0) ? (
            <>
            <div className="flex items-center" > 
                <div className="ml-4 space-y-1">
                <Skeleton className="w-[250px] h-[20px] rounded-full" />  
                </div>   
            </div>
            
            <div className="flex items-center" > 
                <div className="ml-4 space-y-1">
                <   Skeleton className="w-[250px] h-[20px] rounded-full" />  
                </div>   
            </div>

            <div className="flex items-center" > 
                <div className="ml-4 space-y-1">
                <   Skeleton className="w-[250px] h-[20px] rounded-full" />  
                </div>   
            </div>
            </>
        ) : (
            
            Object.entries(entryList.entryList.entradas).reverse().map((entry: any) => (
            <div className="flex items-center" key={entry[0]}>  
                <div className="ml-4 space-y-1">
                <p className={`font-medium leading-none ${checkRegistration(entry[1].UID) === "Not registered" ? "text-red-500" : ""}`}>
                    {checkRegistration(entry[1].UID) === "Not registered" ? `Alguien intento entrar a la casa` : `${checkRegistration(entry[1].UID)} ingresó a la casa`}
                </p>

                </div>
                <div className="ml-auto font-medium">{
                    new Date(entry[1].Ts).toString().slice(0,24)
                }</div> 
            </div>
            ))
        )
        }

      </div>
    )
  }