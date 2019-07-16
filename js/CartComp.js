const cartItem = {
    props: ['img', 'cart'],
    template: `
            <div class="cart-item">
                <div class="product-bio">
                    <img :src="img" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">{{ cart.product_name }}</p>
                        <p class="product-quantity">Quantity: {{ cart.quantity }}</p>
                        <p class="product-single-price">$ {{ cart.price }} each</p>
                    </div>
                </div>
                <div class="right-block">
                    <button class="del-btn" @click="$root.$refs.cart.remove(cart)">&times;</button>
                </div>
            </div>
        `
}

const cart = {
    components: {
        'cart-item': cartItem
    },
    data() {
        return {
            cartUrl: '/getBasket.json',
            imgCart: 'https://placehold.it/50x100',
            cartShown: false,
            cartItems: []
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({
                                quantity: 1
                            }, product)
                            this.cartItems.push(prod)
                        }
                    } else {
                        console.log('Some error')
                    }
                })
        },
        remove(cart) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === cart.id_product)
                        if (find.quantity > 1) {
                            find.quantity--
                        } else {
                            this.cartItems = this.cartItems.filter(el => el.id_product !== cart.id_product)
                        }
                    } else {
                        console.log('Some error')
                    }
                })

            // let find = this.cartItems.find(el => el.id_product === cart.id_product)
            // if (find.quantity > 1) {
            //     find.quantity--
            // } else {
            //     console.log(find)
            // }
        }
    },
    template: `
    <div>
        <button class="btn-cart" type="button" @click="cartShown = !cartShown">Корзина</button>
        <div class="cart-block" v-show="cartShown">
            <cart-item
            v-for="cart of cartItems"
            :key="cart.id_product"
            :cart="cart"
            :img="imgCart"></cart-item>
        </div>
    </div>
    `
}