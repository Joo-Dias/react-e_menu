
import { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList
} from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { ModalPicker } from '../../components/ModalPicker'
import { ListItem } from '../../components/ListItem'
import { Feather } from '@expo/vector-icons'

import { api } from '../../services/api'

type RouteDetailsParams = {
    Order: {
        number: string | number;
        order_id: string | number;
    }
}

type OrderRouteProps = RouteProp<RouteDetailsParams, 'Order'>;

export type CategoryProps = {
    id: string;
    name: string;
}

type ProductProps = {
    id: string;
    name: string;
}

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amout: string | number;
}

export default function Order() {

    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation()

    // Recebendo a lista de objetos
    const [category, setCategory] = useState<CategoryProps[] | []>([])
    // Recebendo o objeto
    const [categorySelected, setCategorySelected] = useState<CategoryProps>()

    // useState para controlar quado o modal está aberto ou fechado
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    // useState para controlar o array de produtos
    const [products, setProducts] = useState<ProductProps[] | []>([])
    // useState para controlar o produto selecionado
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
    // useState para controlar o modal
    const [modalProductVisible, setModalProductVisible] = useState(false)

    const [amount, setAmount] = useState('1')
    const [items, setItems] = useState<ItemProps[]>([])

    // useEffect para carregar o array de categorias
    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category')

            // Pegando a categoria
            setCategory(response.data)
            // Pegando a primeira categoria do array
            setCategorySelected(response.data[0])
        }

        loadInfo()
    }, [])

    // useEffect para carregar o array de produtos
    useEffect(() => {
        async function loadProduct() {
            const response = await api.get('/category/product', {
                // Pegando pela query o ID da categoria os produtos da categoria
                params: {
                    category_id: categorySelected?.id
                }
            })

            setProducts(response.data)
            setProductSelected(response.data[0])
        }

        loadProduct()
    }, [categorySelected])

    // Função para fechar a mesa (order)
    async function handleCloseOrder() {
        try {
            await api.delete('/order', {
                params: {
                    // Utilizando a rota para receber parametros & colocar "?" nos params para não crashar a aplicação
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack()
        } catch (err) {
            console.log(err)
        }
    }

    // Função para mudar a categoria que está selecionada
    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item)
    }

    // Função para mudar o produto que está selecionado
    function handleChangeProduct(item: ProductProps) {
        setProductSelected(item)
    }

    // Função para adicionar produtos na lista da mesa
    async function handleAdd() {
        const response = await api.post('order/add', {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data])
    }

    // Função para remover um produto na lista da mesa
    async function handleDeleteItem(item_id: string) {
        await api.delete('/order/remove', {
            params: {
                item_id: item_id
            }
        })

        // Após remover o produto, atualizar a lista de items
        let removeItem = items.filter(item => {
            return (item.id !== item_id)
        })

        // Passando o novo array para a nossa lista de produtos sem o produto removido
        setItems(removeItem)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name='trash-2' size={29} color='#FF3F4b' />
                    </TouchableOpacity>
                )}
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{ color: '#FFF' }}>
                        {
                            /* Pegando a propriedade nome e colocando no campo
                            Também esperamos ela com o "?" para caso ele não carregar a aplicação não crashar
                        */}
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{ color: '#FFF' }}>{productSelected?.name}</Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholder='1'
                    placeholderTextColor='#F0F0F0'
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
                    disabled={items.length === 0}

                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 14,
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 20,
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#1FD1FF',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#3FFFA3',
        height: 40,
        width: '75%',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    }

})