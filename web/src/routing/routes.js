const routes = [
  {
    when: [],
    to: () => ({ home: true }),
    from: ({ home }) => !!home
  },
  {
    when: ['products'],
    to: () => ({ products: true }),
    from: ({ products }) => !!products
  },
  {
    when: ['products', true],
    to: (productID) => ({ productID }),
    from: ({ productID }) => !!productID
  },
]

// const routes2 = {
//   _: { home: true },
//   children: {
//     products: {
//       _: { products: true },
//       children: (productID) => ({
//         _: { productID }
//       })
//     }
//   }
// }

// const routes2b = route(
//   { home: true },
//   {
//     products: route(
//       { products: true },
//       (productID) => route({ productID })
//     )
//   }
// )

// const routes3 = (
//   <root state={{ home: true }}>
//     <products state={{ products: true }}>
//       {(productID) => ({ productID })}
//     </products>
//   </root>
// }

function pathComponentsWithoutSlashes(path) {
  return path.split('/').filter(Boolean)
}

function makePathToStateForRoutes(routes) {
  return (path) => {
    const output = { notFound: true }
    const components = pathComponentsWithoutSlashes(path)
    
    routes.forEach(route => {
      const params = []
      const totalMatch = components.all((component, index) => {
        const matcher = route.when[index]
        if (matcher === true) {
          params.push(component)
          return true
        }
        else {
          return component === matcher
        }
      })

      if (totalMatch) {
        output = route.to.apply(null, params)
      }
    })

    return output
  }
}
