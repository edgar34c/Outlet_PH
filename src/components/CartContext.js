import {createContext, useState, useContext, useEffect} from 'react'

export const CartContext = createContext()

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState({})
    const [valorTotal, setValorTotal] = useState(0)
    const [tamanho, setTamanho] = useState("34")
    
    useEffect(() =>{
        const cartLocal = window.localStorage.getItem('cart')
        if(cartLocal){
            setCart(JSON.parse(cartLocal))
        }
    }, [])

    useEffect(()=>{
      total()
    }, [cart])

    const addToCart = (product, quantity, tamanho) => {
      setCart(old => {
        let newCart; 
        
        if (old[product.codproduto]) {
          // Se o produto já estiver no carrinho, atualize apenas a quantidade
          newCart = {
            ...old,
            [product.codproduto]: {
              ...old[product.codproduto],
              quantity: old[product.codproduto].quantity + quantity,
              tamanho
            }
          };
        } else {
          // Caso contrário, adicione um novo item ao carrinho com a quantidade especificada
          newCart = {
            ...old,
            [product.codproduto]: {
              ...product,
              quantity: quantity,
              tamanho
            }
          };
        }
      
        window.localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      });
    };
  
      const removeFromCart = (productId) => {
        setCart(old =>{
          const newCart ={}
          Object.keys(old).forEach(id => {
            if(id !== productId){
              newCart[id] = old[id]
            }
          })
          window.localStorage.setItem('cart', JSON.stringify(newCart));
          total(); // Atualiza o valor total após remover do carrinho
          return newCart;
        })
      }

    const changeQuantity = (productId, newQuantity) => {
        setCart((old) => {
            const newCart = {};
            Object.keys(old).forEach((id) => {
                const newProduct = { ...old[id] };
                if (id === productId) {
                    newProduct.quantity = newQuantity;
                }
                newCart[id] = newProduct;
            });
            window.localStorage.setItem('cart', JSON.stringify(newCart));
            total(); // Atualiza o valor total após alterar a quantidade
            return newCart;
        });
    };

    const changeSize = (id, newSize) => {
      setCart(prevCart => {
          const updatedCart = { ...prevCart };
          updatedCart[id].tamanho = newSize;
          window.localStorage.setItem('cart', JSON.stringify(updatedCart));
          return updatedCart;
      });
    };

    const total = () => {
      const dadosLocalStorage = localStorage.getItem('cart');
      const dadosObjeto = JSON.parse(dadosLocalStorage);

      let totalGeral = 0;

      // Percorra os objetos e calcule o total para cada um deles
      for (const key in dadosObjeto) {
        if (dadosObjeto.hasOwnProperty(key)) {
          const item = dadosObjeto[key];
          const quantidade = item.quantity;
          const preco = item.preco;
          const totalItem = quantidade * preco;
          totalGeral += totalItem;
          setValorTotal(totalGeral)
        }
      }
    };
    
    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart, changeQuantity, total, valorTotal, tamanho, setTamanho, changeSize}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = ()=>{
    const cart = useContext(CartContext)
    return cart
}