'use client'

import { FormEvent, Fragment, useState } from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, } from '@headlessui/react'
import Image from 'next/image'
import { addUserEmailToProduct } from '@/lib/action'
interface Props {
    productId: string
}

const Modal = ({ productId }: Props) => {
    const [isOpen, setIsOpen] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [email, setEmail] = useState('')

    const openModel = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        await addUserEmailToProduct(productId, email)

        setIsSubmitting(false)
        setEmail('')
        closeModal()

    }

    return (
        <>
            <button type='button' className='btn' onClick={() => openModel()}>
                Track
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' onClose={closeModal} className="dialog-container">
                    <div className='min-h-screen px-4 text-center'>
                        <TransitionChild
                            as='div'
                            enter='ease-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'

                        >
                            {/* <Dialog.Overlay className='fixed inset-0' /> */}

                        </TransitionChild>
                        <span className='inline-block max-h-screen align-middle'
                            aria-hidden='true' />
                        <TransitionChild
                            as='div'
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'>

                            <div className='dialog-content'>
                                <div className='flex flex-col'>
                                    <div className='flex justify-between'>
                                        <div className='p-3 border-gray-200 rounded-10'>
                                            <Image
                                                src='/assets/icons/logo.svg'
                                                alt='Logo'
                                                width={28}
                                                height={28}
                                            />

                                        </div>
                                        <Image
                                            src='/assets/icons/x-close.svg'
                                            alt='close'
                                            width={24}
                                            height={24}
                                            className='cursor-pointer'
                                            onClick={closeModal}
                                        />

                                    </div>
                                    <h4 className='dialog-head_text'>Stay updated with product pricing alerts right in your inbox!</h4>
                                    <p className='text-sm text-gray-600 mt-2'> Never miss a bargain again with our timely alerts</p>
                                </div>
                                <form onSubmit={handleSubmit} className='flex flex-col mt-5'>
                                    <label htmlFor="email" className='text-sm font-medium text-gray-700'>
                                        Email address
                                    </label>
                                    <div className='dialog-input_container'>
                                        <Image
                                            src='/assets/icons/mail.svg'
                                            alt='mail'
                                            width={18}
                                            height={18}
                                        />
                                        <input
                                            type="email"
                                            id='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder='Enter your email address'
                                            className='dialog-input'
                                        />
                                    </div>
                                    <button type='submit' className='dialog-btn'>
                                        {isSubmitting ? 'Submitting...' : 'Track'}
                                    </button>
                                </form>
                            </div>
                        </TransitionChild>
                    </div>
                </Dialog >
            </Transition >

        </>
    )
}

export default Modal


{/* <div className="fixed inset-0 flex w-screen items-center justify-center p-4"> */ }
{/* <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
    <DialogTitle className="font-bold">Deactivate account</DialogTitle>
    <Description>This will permanently deactivate your account</Description>
    <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
    <div className="flex gap-4">
        <button onClick={() => setIsOpen(false)}>Cancel</button>
        <button onClick={() => setIsOpen(false)}>Deactivate</button>
    </div>
</DialogPanel>
</div> */}
