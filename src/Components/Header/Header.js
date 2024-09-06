import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";

const products = [
  {
    id: "lovebabbar",
    name: "Love babbar 450",
    description: "curated list of 450 essential DSA problems",
    href: `/sheets/lovebabbar/topics`,
    icon: ChartPieIcon,
  },
  {
    id: "striver",
    name: "Striver`s sheet",
    description: "Your 180-problem guide to mastering coding interviews",
    href: "/sheets/striversheet/topics",
    icon: CursorArrowRaysIcon,
  },
  {
    id: "apnacollege",
    name: "Apna College",
    description: "DSA by Shradha Didi & Aman Bhaiya",
    href: "/sheets/apnacollege/topics",
    icon: FingerPrintIcon,
  }
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-black-30 h-13 sticky top-0 z-50 w-lvw">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img src={Logo} className="w-10" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative group">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 ">
              Checklists
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-2 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 group-hover:block transition data-[closed]:translate-y-1 data-[closed]:hidden data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 border-b border-black-30"
                  >
                    <div className="flex-auto">
                      <Link
                        to={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link
            to="progress"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Progress
          </Link>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-500 cursor-not-allowed"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()} // Prevent default link behavior
            title="Coming soon" // Tooltip message
          >
            Resources
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-500 cursor-not-allowed"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()} // Prevent default link behavior
            title="Coming soon" // Tooltip message
          >
            Interview
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 hidden"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-3/5 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-transform duration-300 ease-in-out transform ${ mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">DS Sheets</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Checklists
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  to="/progress"
                  onClick={handleMenuClose}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  progress
                </Link>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50 cursor-not-allowed"
                >
                  Resources
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50 cursor-not-allowed"
                >
                  Interview
                </a>
              </div>
              {/* <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div> */}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
