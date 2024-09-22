'use client'

import { useLayoutEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import Wrapper from '@/layouts/Wrapper'
import logoImage from '@/assets/logo.jpg'
import NavModal from './NavModal'
import LinkButton from '@/components/ui/LinkButton'
import { cn } from '@/utils'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav(props: NavProps) {
  const [scrollPosition, setScrollPosition] = useState(0)

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        props.fixed ? 'fixed' : 'sticky',
        'top-0 w-full -z-[-999] border-b border-transparent transition-all duration-300 text-white bg-transparent',
        !(scrollPosition === 0 && props.transparent) &&
          'bg-red-500/80 border-b-gray-500/20 backdrop-blur-lg shadow-sm'
      )}
    >
      <Wrapper>
        <div className={'flex justify-between items-center'}>
          <IconButton component={Link} href="/">
            <Image
              alt={'Logo'}
              src={logoImage.src}
              className={'w-10 h-10 rounded-[50%]'}
              width={logoImage.width}
              height={logoImage.height}
            />
          </IconButton>

          <div className={'hidden sm:flex items-center gap-3'}>
            {links.map((link, i) => (
              <LinkButton
                key={i}
                variant={'text'}
                color={'inherit'}
                href={link.to}
              >
                {link.label}
              </LinkButton>
            ))}
          </div>

          <div className={'hidden sm:block'}>
            <LinkButton
              href={'/admin'}
              color={'inherit'}
              variant={scrollPosition > 0 ? 'contained' : 'outlined'}
            >
              Admin
            </LinkButton>
          </div>

          <div className={'block sm:hidden'}>
            <NavModal />
          </div>
        </div>
      </Wrapper>
    </nav>
  )
}

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contacts' },
]

type NavProps = {
  transparent?: boolean
  fixed?: boolean
}
