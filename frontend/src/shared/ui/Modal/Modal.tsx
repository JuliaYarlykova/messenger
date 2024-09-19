import { classNames } from '@/shared/lib/classNames/classNames'
import { AnimatePresence, motion } from 'framer-motion'

import cls from './Modal.module.scss'
import { ReactNode } from 'react'

interface Modal {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal = (props: Modal) => {
  const { isOpen, children, onClose } = props
  return (
    <>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={onClose}
            className={cls.background}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
              className={classNames(cls.ModalSuccess, {}, [])}
            >
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  )
}
