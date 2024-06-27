import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
const Header = () => {
  return (
    <>
      <div className="font-cust  text-white fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0a0a0a] bg-opacity-95 text-lg">
        <div className="text-xl  font-light">
          <Sheet>
            <SheetTrigger asChild>
              <Button className=" bg-[#000000] text-white" variant="">
                <MenuIcon className="h-8 w-8" />
                <span className="pl-2 text-md">Your Rooms</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className=" bg-[#171717] text-white border-0 "
            >
              <div className="bg-muted border-r p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">Rooms</h2>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Search rooms..."
                      // value={searchTerm}
                      // onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-8 w-40 rounded-md bg-background px-3 text-sm"
                    />
                    <Button variant="ghost" size="icon">
                      {/* <PlusIcon className="h-5 w-5" /> */}
                      <span className="sr-only">Create new room</span>
                      Add
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {/* {filteredRooms.map((room) => (
                    <Link
                      key={room.id}
                      href="#"
                      className="flex items-center gap-3 rounded-md bg-background px-3 py-2 hover:bg-muted/50"
                      prefetch={false}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{room.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {room.description}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {room.members}
                      </div>
                    </Link>
                  ))} */}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <nav className=" hidden gap-4 justify-center lg:flex ">
          <Link
            className="hover:underline cursor-pointer"
            target="blank"
            href="/guest"
          >
            Guest
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
