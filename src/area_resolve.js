import FileSystem from 'fs'
import Path from 'path'

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
  if (FileSystem.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(Path.dirname(dirname))) {
      FileSystem.mkdirSync(dirname)
      return true
    }
  }
}

let list_code = FileSystem.readFileSync(Path.join(process.cwd(), 'config/area/list_code.json'), 'UTF-8')
list_code = list_code.replace(/^\uFEFF/, '')

let data = JSON.parse(list_code)

let province = {}
let province_code = 0
let city = {}
let city_code = 0
let area = {}
let hasCity = false
let data_json = []
let province_json = {}
let city_json = {}
let area_code = 0
let i = 0
for (let code in data) {
  if (!(code % 1e4)) {     //获取所有的省级行政单位
    province[code] = data[code]
    province_code = code
    if (i !== 0) {
      data_json.push(Object.assign({}, province_json))
    }
    i++

    province_json = {
      code: code,
      name: province[code]
    }


  } else {
    var p = code - province_code
    if (province_code && p > 0 && p < 1e4) {    //同省的城市或地区
      if (!(code % 100)) {
        hasCity = true
        city[code] = data[code]
        // city
        city_code = code


        // if (province_json.city) {
        //   province_json.city.push(Object.assign({}, city_json))
        // }

        if (!province_json.city) {
          province_json.city = []
        }


        city_json = {
          code: code,
          name: city[code]
        }

        province_json.city.push(city_json)


      } else if (p > 8000) {                 //省直辖县级行政单位
        city[code] = data[code]
        // city 
        city_code = code

        // if (province_json.city) {
        //   province_json.city.push(Object.assign({}, city_json))
        // }

        if (!province_json.city) {
          province_json.city = []
        }

        city_json = {
          code: code,
          name: city[code]
        }

        province_json.city.push(city_json)



      } else if (hasCity) {                  //非直辖市
        var c = code - city_code
        if (city_code && c > 0 && c < 100) {     //同个城市的地区
          area[code] = data[code]
          // area
          area_code = code

          if (!city_json.area) {
            city_json.area = []
          }
          city_json.area.push({
            code: code,
            name: area[code]
          })


        }
      } else {
        //直辖市
        area[code] = data[code]
        // area
        area_code = code

        if (!city_json.area) {
          city_json.area = []
        }

        city_json.area.push({
          code: code,
          name: area[code]
        })

      }

    }
  }

  hasCity = false
}

data_json.push(Object.assign({}, province_json))


let last_result = {
  code: 200,
  data: data_json,
  success: true
}

let data_str = JSON.stringify(last_result)

mkdirsSync(Path.join(process.cwd(), 'areas/town'))

FileSystem.writeFileSync(Path.join(process.cwd(), 'areas/list.json'), data_str)

let town_files = FileSystem.readdirSync(Path.join(process.cwd(), 'config/area/town'))

for (let town_file of town_files) {

  let town_content = FileSystem.readFileSync(Path.join(process.cwd(), 'config/area/town/' + town_file), 'UTF-8')
  town_content = town_content.replace(/^\uFEFF/, '')

  let town_data = JSON.parse(town_content)
  let town_data_json = []
  for (let key in town_data) {
    town_data_json.push({
      code: key,
      name: town_data[key]
    })
  }

  let town_last_result = {
    code: 200,
    data: town_data_json,
    success: true
  }
  let town_data_json_str = JSON.stringify(town_last_result)
  FileSystem.writeFileSync(Path.join(process.cwd(), 'areas/town/' + town_file), town_data_json_str)

}



console.log(`finish...`)
