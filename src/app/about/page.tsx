import { getMarkdownFileData } from '../lib/markdown';
import Link from 'next/link'


const About: React.FC = async () => {
  const markdownData = await getMarkdownFileData();
  return (
    <div className='overflow-y-scroll'>
      <p>
        <Link className='text-2xl text-primary-content' href="./chat">{`<<< Back`}</Link>
      </p>
      <div dangerouslySetInnerHTML={{ __html: markdownData.contentHtml }} />
    </div>
  );
};

export default About;