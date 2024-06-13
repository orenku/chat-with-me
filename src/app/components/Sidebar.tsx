import Link from 'next/link'
import React from 'react'
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

const name = process.env.MY_NAME
const linkedinLink = process.env.LINKEDIN_LINK
const githubLink = process.env.GITHUB_LINK

const aboutMe: string | TrustedHTML = process.env.ABOUT_ME || ""

function Sidebar() {
    return (
        <div className="p-5 bg-secondary w-1/3 flex flex-col">
            <div className='flex-grow'>
                <div className='text-1xl m-1 text-accent-content'>Hi, my name is</div>
                <div className="text-4xl m-1 font-extrabold text-accent-content">{name}.</div>
                <div className="text-3xl m-1 font-bold text-accent-content">I love Tech & Business</div>
                <p className="m-1 text-secondary-content" dangerouslySetInnerHTML={{ __html: aboutMe }} />
            </div>

            <div>
                <p className='text-3xl m-1 mt-1 flex-grow font-bold text-accent-content'>About this website.</p>
                <p className='m-1 mt-5 text-secondary-content'>
                    I&apos;ve built this chat engine using <b>LlamaIndex & NextJS</b>, utilizing <b>RAG</b> and <b>LLM</b> technologies, enriched with details about myself that go beyond what&apos;s in my resume or LinkedIn profile.</p>
            </div>

            <div>
                <div className='text-3xl m-1 mt-20 font-bold text-accent-content'>Under the hood</div>
                <p className='m-1 mt-5 text-secondary-content'>If you are interested to learn how I built this, take a look under the <Link className="underline text-accent font-bold" href={'/about'}>hood</Link></p>
            </div>
            <div className='flex justify-end text-accent-content'>
                <a className='m-2' href={githubLink} target="_blank">
                    <FontAwesomeIcon icon={faGithub} size="xl" />
                </a>
                <a className='m-2' href={linkedinLink} target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} size="xl" />
                </a>
            </div>

        </div>
    )
}

export default Sidebar