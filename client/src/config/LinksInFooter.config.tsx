import {
  SvgVK,
  SvgTelegram,
  SvgPortfolio,
  SvgGitHub,
} from '../components/Icons'

export const config = {
  links: [
    {
      name: 'Вконтакте',
      href: 'https://vk.com/geditpro',
      icon: <SvgVK className='icon' />,
    },
    {
      name: 'Телеграм',
      href: 'https://t.me/ever4night',
      icon: <SvgTelegram className='icon' />,
    },
    {
      name: 'Портфолио',
      href: 'https://vimeo.com/grockwix',
      icon: <SvgPortfolio className='icon' />,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/grockwix',
      icon: <SvgGitHub className='icon' />,
    },
  ],
}
