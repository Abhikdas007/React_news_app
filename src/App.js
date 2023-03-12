import React, {useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './Components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';
import useStyels from './styles';

const alenKey = 'e3d803a02a311a88fd00ca606efb5c1f2e956eca572e1d8b807a3e2338fdd0dc/stage';

export default function App() {
  const classes = useStyels();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticles, setActiveArticles] = useState(-1);
    useEffect(() =>{
        alanBtn({
            key: alenKey,
            onCommand : ({command, articles, number}) =>{
                if(command === 'newHeadlines'){
                  setNewsArticles(articles);
                  setActiveArticles(-1);
                }else if(command === 'highlight'){
                  setActiveArticles((previousArticels) => previousArticels+1);
                }else if (command === 'open') {
                  const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                  const article = articles[parsedNumber - 1];
        
                  if (parsedNumber > articles.length) {
                    alanBtn().playText('Please try that again...');
                  } else if (article) {
                    window.open(article.url, '_blank');
                    alanBtn().playText('Opening...');
                  } else {
                    alanBtn().playText('Please try that again...');
                  }
                }
            }
        })
    }, [])
  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="https://lh3.googleusercontent.com/p/AF1QipOh0FYp3HkUyHawVlBChxLqBn-Dmz9bOfzNXqgq=w1080-h608-p-no-v0" alt="loho" className={classes.alanLogo} />
      </div>
      <NewsCards articles={newsArticles} activeArticles={activeArticles}/>
    </div>
  )
}
