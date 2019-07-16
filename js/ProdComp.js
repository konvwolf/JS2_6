const product = {
    props: ['product'],
    template: `
                <div class="product-item">
                    <img :src="product.image" alt="Some img">
                    <div class="desc">
                        <h3>{{ product.product_name }}</h3>
                        <p>{{ product.price }} $</p>
                        <button class="buy-btn" @click="addProduct(product)">Купить</button>
                    </div>
                </div>
            `
}

const products = {
    components: {product},
    data () {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: []
        }
    },
    mounted () {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    methods: {
        filter () {
            let regExp = new RegExp (this.userSearch, 'i')
            return this.filtered = this.filter.filter(el => regExp.test(el.product_name))
        }
    },
    template: `
                <div class="products">
                    <product 
                    v-for="product of filtered" 
                    :key="product.id_product"
                    :img="product.image"
                    :product="product"></product>
                </div>
            `
}