import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
} from "../productSlice";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "beauty", label: "beauty", checked: false },
      { value: "fragrances", label: "fragrances", checked: false },
      { value: "furniture", label: "furniture", checked: false },
      { value: "groceries", label: "groceries", checked: false },
      {
        value: "home-decoration",
        label: "home decoration",
        checked: false,
      },
      {
        value: "kitchen-accessories",
        label: "kitchen accessories",
        checked: false,
      },
      { value: "laptops", label: "laptops", checked: false },
      { value: "mens-shirts", label: "mens shirts", checked: false },
      { value: "mens-shoes", label: "mens shoes", checked: false },
      { value: "mens-watches", label: "mens watches", checked: false },
      {
        value: "mobile-accessories",
        label: "mobile accessories",
        checked: false,
      },
    ],
  },
  {
    id: "brand",
    name: "Brands",
    options: [
      { value: "Essence", label: "Essence", checked: false },
      { value: "Glamour Beauty", label: "Glamour Beauty", checked: false },
      { value: "Velvet Touch", label: "Velvet Touch", checked: false },
      { value: "Chic Cosmetics", label: "Chic Cosmetics", checked: false },
      { value: "Nail Couture", label: "Nail Couture", checked: false },
      { value: "Calvin Klein", label: "Calvin Klein", checked: false },
      { value: "Chanel", label: "Chanel", checked: false },
      { value: "Dior", label: "Dior", checked: false },
      {
        value: "Dolce & Gabbana",
        label: "Dolce & Gabbana",
        checked: false,
      },
      { value: "Gucci", label: "Gucci", checked: false },
      {
        value: "Annibale Colombo",
        label: "Annibale Colombo",
        checked: false,
      },
      { value: "Furniture Co.", label: "Furniture Co.", checked: false },
      { value: "Knoll", label: "Knoll", checked: false },
      { value: "Bath Trends", label: "Bath Trends", checked: false },
      { value: "Apple", label: "Apple", checked: false },
      { value: "Asus", label: "Asus", checked: false },
      { value: "Huawei", label: "Huawei", checked: false },
      { value: "Lenovo", label: "Lenovo", checked: false },
      { value: "Dell", label: "Dell", checked: false },
      { value: "Fashion Trends", label: "Fashion Trends", checked: false },
      { value: "Gigabyte", label: "Gigabyte", checked: false },
      { value: "Classic Wear", label: "Classic Wear", checked: false },
      { value: "Casual Comfort", label: "Casual Comfort", checked: false },
      { value: "Urban Chic", label: "Urban Chic", checked: false },
      { value: "Nike", label: "Nike", checked: false },
      { value: "Puma", label: "Puma", checked: false },
      { value: "Off White", label: "Off White", checked: false },
      {
        value: "Fashion Timepieces",
        label: "Fashion Timepieces",
        checked: false,
      },
      { value: "Longines", label: "Longines", checked: false },
      { value: "Rolex", label: "Rolex", checked: false },
      { value: "Amazon", label: "Amazon", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });
    setFilter(newFilter);
  };
  const handleSort = (option) => {
    const sort = { ...filter, _sort: option.sort, _order: option.order };
    console.log({ sort });
    setFilter(sort);
  };

  useEffect(() => {
    dispatch(fetchProductsByFiltersAsync({ filter, sort }));
  }, [dispatch, filter, sort]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        ></MobileFilter>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <p
                          onClick={(e) => handleSort(option)}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          )}
                        >
                          {option.name}
                        </p>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <DesktopFilter handleFilter={handleFilter}></DesktopFilter>
              {/* Product grid */}
              <ProductGrid products={products}></ProductGrid>
            </div>
          </section>
          {/* pagination content */}
          <Pagination></Pagination>
        </main>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
}) {
  return (
    <Dialog
      open={mobileFiltersOpen}
      onClose={setMobileFiltersOpen}
      className="relative z-40 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">
            <h3 className="sr-only">Categories</h3>

            {filters.map((section) => (
              <Disclosure
                key={section.id}
                as="div"
                className="border-t border-gray-200 px-4 py-6"
              >
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon
                        aria-hidden="true"
                        className="size-5 group-data-[open]:hidden"
                      />
                      <MinusIcon
                        aria-hidden="true"
                        className="size-5 group-[&:not([data-open])]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex gap-3">
                        <div className="flex h-5 shrink-0 items-center">
                          <div className="group grid size-4 grid-cols-1">
                            <input
                              defaultValue={option.value}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              onChange={(e) => handleFilter(e, section, option)}
                              className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                            />
                            <svg
                              fill="none"
                              viewBox="0 0 14 14"
                              className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                            >
                              <path
                                d="M3 8L6 11L11 3.5"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-[:checked]:opacity-100"
                              />
                              <path
                                d="M3 7H11"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-0 group-has-[:indeterminate]:opacity-100"
                              />
                            </svg>
                          </div>
                        </div>
                        <label
                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                          className="min-w-0 flex-1 text-gray-500"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function DesktopFilter({ handleFilter }) {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section) => (
        <Disclosure
          key={section.id}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="size-5 group-data-[open]:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="size-5 group-[&:not([data-open])]:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex gap-3">
                  <div className="flex h-5 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultValue={option.value}
                        defaultChecked={option.checked}
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        onChange={(e) => handleFilter(e, section, option)}
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:checked]:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </form>
  );
}

function Pagination() {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="lg:col-span-3">
      {/* Your content */}
      <div className="">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <Link key={product.id} to="/product-detail">
                <div
                  key={product.id}
                  className="group relative border-solid border-2 border-gray-200 p-2"
                >
                  <img
                    alt={product.title}
                    src={product.thumbnail}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-60"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <div href={product.thumbnail}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </div>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        <StarIcon className="w-6 h-6 inline"></StarIcon>
                        <span className="align-bottom"> {product.rating}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm block font-medium text-gray-900">
                        ₹
                        {Math.round(
                          product.price * (1 - product.discountPercentage / 100)
                        )}
                      </p>
                      <p className="text-sm line-through font-medium text-gray-400">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
