/* eslint-disable indent */
import { h, Component } from 'preact';
import style from './style';

export default class Movies extends Component {
    state = {
        currentMovie: null,
        movieIds: ['tt4976192',
            'tt6998518',
            'tt3481634',
            'tt5460530',
            'tt5580536',
            'tt4382824',
            'tt6143568',
            'tt5462326',
            'tt1071875',
            'tt1674784',
            'tt1214962',
            'tt1502404',
            'tt0479997',
            'tt0963966',
            'tt0083929',
            'tt0086525',
            'tt0086216',
            'tt0087968',
            'tt0087089',
            'tt0086969',
            'tt0090769',
            'tt0091738',
            'tt0093822',
            'tt0093565',
            'tt0098577',
            'tt0095722',
            'tt0100762',
            'tt0100935',
            'tt0099575',
            'tt0099844',
            'tt0101004',
            'tt0104438',
            'tt0106266',
            'tt0105226',
            'tt0106684',
            'tt0109951',
            'tt0110167',
            'tt0111477',
            'tt0113552',
            'tt0113627',
            'tt0117500',
            'tt0118880',
            'tt0119094',
            'tt0120632',
            'tt0120832',
            'tt0134273',
            'tt0163988',
            'tt0187078',
            'tt0218967',
            'tt0238112',
            'tt0259929',
            'tt0245562',
            'tt0305973',
            'tt0268126',
            'tt0325805',
            'tt0368891',
            'tt0399295',
            'tt0384680',
            'tt0429589',
            'tt0469641',
            'tt0450345',
            'tt0259324',
            'tt0462322',
            'tt0435705',
            'tt0465234',
            'tt0814022',
            'tt0448011',
            'tt0436339',
            'tt1095217',
            'tt0375568',
            'tt1656186',
            'tt0481499',
            'tt2005374',
            'tt2382396',
            'tt2401807',
            'tt1552224',
            'tt2467046',
            'tt1274586',
            'tt3687398',
            'tt3733778',
            'tt3733774',
            'tt4054654',
            'tt3774114',
            'tt2032572',
            'tt7295450',
            'tt4633694',
            'tt3758162',
            'tt5073642',
            'tt5792656',
            'tt7394816',
            'tt8535180',
            'tt8380776',
            'tt6372694',
            'tt4687856',
            'tt9624766',
            'tt2850386',
            'tt11003218',
            'tt5843576',
            'tt1250777'
        ],
        moviesSwap: []
    };

    shuffle = a => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    nope = async e => {
        const { movieIds, moviesSwap } = this.state;
        const shuffled = this.shuffle(movieIds);
        const randomId = shuffled.pop();
        moviesSwap.push(randomId);

        const response = await fetch('http://www.omdbapi.com/?apikey=*******&i=' + randomId);
        if (response.status !== 200) {
            console.error('failed to fetch');
            return;
        }

        this.setState({
             currentMovie: await response.json(),
              movieIds: movieIds.length > 0 ? movieIds : moviesSwap,
            moviesSwap: movieIds.length > 0 ? moviesSwap : [] });
    }

    async componentWillMount() {
        const { movieIds, moviesSwap } = this.state;
        const shuffled = this.shuffle(movieIds);
        const randomId = shuffled.pop();
        moviesSwap.push(randomId);
        const response = await fetch('http://www.omdbapi.com/?apikey=*******&i=' + randomId);
        if (response.status !== 200) {
            console.error('failed to fetch');
            return;
        }

        this.setState({
            currentMovie: await response.json(),
             movieIds: movieIds.length > 0 ? movieIds : moviesSwap,
           moviesSwap: movieIds.length > 0 ? moviesSwap : [] });
    }

    render() {
        const { Title, Year, Runtime, Poster, Ratings = [] } = this.state.currentMovie || {};
        return (
            <div class={style.movies}>
                    <div class={style.row}>
                        <div class={style.flexitem}><h1>{Title} - {Year}</h1></div>
                    
                    <h2 style={{textAlign: 'center'}}>{Runtime}</h2>
                    <img class={style.image} src={Poster} />
                    <h3 style={{textAlign: 'center'}}>Ratings</h3>
                    {Ratings.map(r => (
                        <div style={{textAlign: 'center'}}>
                            <span>{r.Source} - {r.Value}</span>
                        </div>
                    ))}
                    <button class={style.button} onClick={this.nope}>Nope</button>
                </div>
            </div>
        )
    }
}