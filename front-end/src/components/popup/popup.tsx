import { useState } from "react";
import { createContext, ReactNode } from "react";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface DynamicElementState<D = {}> {
	data: D;
	setData: (newState: D) => void;
}

interface PopupArrayEmelent<T = {}> {
	title?: string;
	text?: string | JSX.Element;
	defaultValue?: T;
	dynamicElement?: (state: DynamicElementState<T>) => JSX.Element;
	yes?: (data: T) => void;
	no?: () => void;
}

interface Props {
	children: ReactNode;
}

interface Popup {
	yesNo: <T = {}>(p: PopupArrayEmelent<T>) => void;
}

export const PopupContext = createContext<Popup>({} as any);

export default function PopupContextProvider({ children }: Props): JSX.Element {

	const [popupArray, setPopupArray] = useState<PopupArrayEmelent[]>([]);
	const popup: Popup = {
		yesNo: (p: PopupArrayEmelent<any>) => {
			const arrayElement: PopupArrayEmelent = {
				...p,
				yes: (data: any) => {
					if (p.yes) {
						p.yes(data);
					}
					setPopupArray((prevPopupArray) => {
						const newArr = [
							...prevPopupArray.filter((el) => {
								return el != arrayElement;
							}),
						];
						return newArr;
					});
				},
				no: () => {
					if (p.no) {
						p.no();
					}
					setPopupArray((prevPopupArray) => {
						const newArr = [
							...prevPopupArray.filter((el) => {
								return el != arrayElement;
							}),
						];
						return newArr;
					});
				},
			};

			setPopupArray((prevPopupArray) => {
				return [...prevPopupArray, arrayElement];
			});
		},
	};

	return (
		<PopupContext.Provider
			value={{
				...popup,
			}}
		>
			<>
				{popupArray.map((p, index) => {
					return <PopupDialog {...p} key={index} />;
				})}
			</>
			{children}
		</PopupContext.Provider>
	);
}

function PopupDialog(p: PopupArrayEmelent): JSX.Element {
	const [dialogState, setDialogState] = useState<any>(p.defaultValue);

	return (

		<Dialog  			open={true}
		onClose={() => {
			p.no && p.no();
		}}
		 className="relative z-10">
		<DialogBackdrop
		  transition
		  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
		/>
  
		<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
		  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
			<DialogPanel
			  transition
			  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
			>
			  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
				<div className="sm:flex sm:items-start">
				  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
					<ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
				  </div>
				  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
					<DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
					{p.title || ""}
					</DialogTitle>
					<div className="mt-2">
					  <p className="text-sm text-gray-500">
					  {p.dynamicElement ? (
					p.dynamicElement({
						data: dialogState,
						setData: setDialogState,
					})
				) : (
					p.text
				)}
					  </p>
					</div>
				  </div>
				</div>
			  </div>
			  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
				<button
				  type="button"
				  onClick={() => {
									// console.log(dialogState, 1111);
									p.yes && p.yes(dialogState);
								}}
									  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
				>
				  Deactivate
				</button>
				<button
				  type="button"
				  data-autofocus

				onClick={() => {
									p.no && p.no();
								}}
				  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
				>
				  Cancel
				</button>
			  </div>
			</DialogPanel>
		  </div>
		</div>
	  </Dialog>
		
	);
}
