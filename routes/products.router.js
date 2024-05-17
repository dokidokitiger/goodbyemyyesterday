import express from 'express';
import Products from '../schemas/products.schema.js';
import mongoose from 'mongoose';


const router = express.Router();

// 상품 등록 API
router.post('/products', async (req, res) => {
  try {
    // 1. 클라이언트로부터 products 관련 데이터 가져오기
    const { name, description, manager, password } = req.body;

    if (!name) {
        return res.status(400).json({ message: '상품 정보를 모두 입력해주세요.' });
      }

    const dopleganger = await Products.findOne({ name: name });
    if (dopleganger) {
      return res.status(400).json({ message: '이미 등록된 상품입니다.' });
    }

    // 2. products 생성
    const createProduct = new Products({
      name: name,
      description: description,
      manager: manager,
      password: password,
    });

    // 3. products 저장
    const savedProduct = await createProduct.save();

    // 4. 생성된 products를 클라이언트한테 response 반환
    // 응답에서 password 필드를 제거
    const { id, status, createdAt, updatedAt } = savedProduct;
    return res.status(201).json({
        id : _id,
        name: name,
        description: description,
        manager: manager,
        status: status,
        createdAt: createdAt,
        updatedAt: updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message : '예상치 못한 에러가 발생했습니다. 관리자에게 문의해주세요.' });
  }
});
// 상품조회 api

router.get('/products', async(req, res) => {
    //1. response인 saveProduct를 최신순으로 정렬하기.
    const products = await Products.find().sort('-createdAt').exec();

    //2. 그 후 클라이언트에게 반환
    return res.status(200).json({products});
});
//상품 상세 페이지
router.get('/products/:id', async(req, res)=>{
    try {
        const productId = req.params; // 요청에서 상품 ID 가져오기

        // 해당 ID를 가진 상품 조회
        const product = await Products.findById(productId);

        // 상품이 존재하지 않을 경우 에러 응답
        if (!product) {
            return res.status(404).json({ message: '상품이 존재하지 않습니다.' });
        }

        // 상품이 존재할 경우 상세 정보 응답
        return res.status(200).json({ product });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;