import React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import ImageListNew6Items from '../common/ImageListNew6Items'
import logo1 from './../../images/art3.png'
import logo2 from './../../images/art11.jpg'
import logo3 from './../../images/art3.png'

interface IProps {

}

interface IInjectedProps extends IProps, WithStyles<typeof styles>{

}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {
        // width: '100vh',
    },
    img1: {
        // position: 'relative',
        // left: 0,

        // top: 0,
        width: '100%',
    },
    textContainer: {
        padding: '15px',
    },
    dotContainer: {
        display: "flex",
        width: '100%',
        margin: '0 auto',
        justifyContent: 'center',
    },
    dotItem: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#A6A6A6',
        color: 'gray',
        margin: '20px 10px',
    },
})

class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    render () {
        const { classes } = this.injected
        return (
            <div className={classes.root}>
                <img className={classes.img1} src={logo1} alt={"image1"}/>
                <div className={classes.textContainer}>
                    <p>Торты на заказ от кондитерской Tortodel</p>
                    <p>
                        Если хорошо подумать, то что первое приходит на ум при слове праздник и без чего невозможно представить такое событие? Наверняка вы подумали о том, о чем и мы – это торт. Попробуйте вспомнить хоть один день рождения без сладкого. Именно сладким столом заканчивается любой праздник. Но как можно сделать это событие более ярким и запоминающимся, ведь обычным магазинным тортом вряд ли кого-то удивишь в наши дни. Кондитерская в Мариуполе – Tortodel, предлагает вам для этого торты на заказ.
                    </p>
                    <p>
                        Мы уже более 3х лет изготовляем кондитерские изделия по индивидуальному заказу, и имеем самое главное в этом деле – опыт. Мы точно знаем, как сделать ваш праздник по настоящему незабываемым. Когда мы изготовляем очередной торт на заказ, в ход идут только свежие, качественные ингредиенты, потому что без этого невозможно достичь идеального вкуса.
                    </p>
                    <p>
                        Мы принимаем заказы любой сложности, а также всегда готовы учесть любые пожелания касательно ингредиентов, если у вас, например, непереносимость некоторых продуктов.
                    </p>
                </div>
                <div className={classes.dotContainer}>
                    <div className={classes.dotItem}/>
                    <div className={classes.dotItem}/>
                    <div className={classes.dotItem}/>
                </div>
                <img className={classes.img1} src={logo2} alt={"image2"}/>
                <ImageListNew6Items/>
                <div className={classes.dotContainer}>
                    <div className={classes.dotItem}/>
                    <div className={classes.dotItem}/>
                    <div className={classes.dotItem}/>
                </div>
                <div className={classes.textContainer}>
                    <p>
                        Чтобы купить торт на заказ, можно не тратить время на поиски по сайту, если вы уже знаете, что хотите. Просто воспользуйтесь номером телефона, который указан на сайте, и оформляйте торт по индивидуальному заказу прямо по телефону.
                    </p>
                    <p>
                        Сложно отрицать, что лучшая кондитерская Мариуполя – это Tortodel. Ведь на протяжении стольких лет, мы радуем наших клиентов вкусными и красивыми тортами. Наша главная цель, обслужить клиента настолько качественно, чтобы он не захотел менять кондитерскую.
                    </p>
                    <p>
                        Именно поэтому люди возвращаются к нам снова и снова.
                    </p>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(Home)