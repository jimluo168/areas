import numbers from 'numbers'

  ; (async () => {
    let rs = numbers.calculus.Riemann(Math.sin, -2, 4, 200)
    console.log(`${rs}`)


    var array1 = [0, 1, 2]
    var array2 = [3, 4, 5]

    rs = numbers.matrix.addition(array1, array2)
    console.log(`${rs}`)


    var matrixA = [
      [0, 1, 2],
      [3, 4, 5]
    ]

    var matrixB = [
      [0, 3],
      [1, 4],
      [2, 5]
    ]

    rs = numbers.matrix.multiply(matrixA, matrixB)
    console.log(`${rs}`)


    let matrixC = []
    for (let i = 0; i < 1000000; i++) {
      let item = []
      for (let j = 0; j < 10; j++) {
        item.push(1 * Math.random())
      }
      matrixC.push(item)
    }

    let matrixD = []
    for (let i = 0; i < 10; i++) {

      matrixD.push([100 * Math.random()])
    }

    console.log('\n')

    let start_time = new Date().getTime()

    rs = numbers.matrix.multiply(matrixC, matrixD)

    console.log(` ${new Date().getTime() - start_time} ms.`)

    // console.log(`${rs}`)


  })()