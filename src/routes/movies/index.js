import { h, Component } from 'preact';
import movieIds from './ids';
import style from './style';

export default class Movies extends Component {
    state = {
        currentMovie: null,
        movieIds: movieIds,
        moviesSwap: []
    };

    shuffle = a => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    nope = async () => {
        const { movieIds, moviesSwap } = this.state;
        const shuffled = this.shuffle(movieIds);
        const randomId = shuffled.pop();
        moviesSwap.push(randomId);

        const response = await fetch('https://www.omdbapi.com/?apikey=e69cd32d&i=' + randomId);
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
        const response = await fetch('https://www.omdbapi.com/?apikey=e69cd32d&i=' + randomId);
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
                    <h3 style={{ textAlign: 'center' }}>Ratings</h3>
                    {Ratings.map(r => (
                        <div style={{ textAlign: 'center' }}>
                            <span>{r.Source} - {r.Value}</span>
                        </div>
                    ))}
                    <button class={style.button} onClick={this.nope}>Nope</button>
                </div>
            </div>
        )
    }
}