import { config } from '../config/LinksInFooter.config'
import type { TLink } from '../types/LinksInFooter'
import type { FC } from 'react'

const links = config.links

// Ссылка с иконкой
const Link: FC<TLink> = ({ name, href, icon }) => {
  return (
    <>
      <a className='link' href={href} target='_blank'>
        {icon}
        <p>{name}</p>
      </a>
    </>
  )
}

// Блок со всеми ссылками
function LinksInFooter() {
  return (
    <nav>
      <h4>Ссылки</h4>
      {links.map(({ name, href, icon }) => (
        <Link key={name} name={name} href={href} icon={icon} />
      ))}
      <h5>gprodsofcomm@gmail.com</h5>
    </nav>
  )
}

export { LinksInFooter }
