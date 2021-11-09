import React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'

interface IProps {

}

interface IInjectedProps extends IProps , WithStyles<typeof styles> {

}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    container: {
      margin: '0 5px',
    },
})



class Order extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {

        }
    }

    get injected () {
        return this.props as IInjectedProps
    }

    componentDidMount () {

    }

    render () {
        const { classes } = this.injected
        return (
            <div className={classes.container}>
                <h2>Как заказать</h2>
                <p>
                    <b>Шаги</b>
                    <ul>
                        <li>Зарегистрироваться на сайте</li>
                        <li>Выбрать предпочтительный товар</li>
                        <li>заполнить все необходимые данные на странице товара</li>
                        <li>Нажать кнопку "добавить в корзину"</li>
                        <li>Перейти в корзину(сверху на панели навигации)</li>
                        <li>Нажать кнопку "заказать"</li>
                    </ul>
                </p>

                <p><b>Доставка:</b>
                    <div>Доставка осуществляется по городу Мариуполь.</div>
                </p>
                <p><b>Как Вам будет удобно получить заказ?</b>
                    <ul>
                        <li>Самовывоз по адресу пр. Металлургов д.101</li>
                        <li>Курьерская доставка в течении дня с 10:00 до 19:00 (ожидайте курьера в это время, предварительно он с вами свяжется) = 150 грн</li>
                        <li>Доставка за город уточняется индивидуально</li>
                        <li>При самовывозе ответственность за сохранность продукции с момента ее получения несет покупатель.</li>
                    </ul>
               </p>
                <p><b>Заказ:</b>
                <div>
                    <ul>
                        <li>
                            Минимальный заказ тортов – от 2 кг
                        </li>
                        <li>
                            Минимальный заказ капкейков – 6 шт
                        </li>
                        <li>
                            Минимальный заказ макаронс – 10 шт
                        </li>
                        <li>
                            Минимальный заказ печенья – 30 шт
                        </li>
                        <li>
                            Стоимость упаковки – от 30 грн
                        </li>
                    </ul>

                </div>
                </p>
                <p>
                    <b>Оплата:</b>
                    <div>Оплата осуществляется переводом средств на карту <b>Приват банка</b> или при получении продукции <b>Наличными</b></div>
                    <div>Упаковка и декор оплачиваются дополнительно</div>
                    <div>
                        <div>При заказе на любую сумму необходимо внести предоплату 50%.</div>
                        <div>При оформлении заказа на подарок другому человеку/компании — предоплата 100%.</div>
                    </div>

                </p>
            </div>
        )
    }
}

export default withStyles(styles)(Order)