<?php

namespace App\Controller\API;

use App\Entity\CartItem;
use App\Entity\Product;
use App\Repository\CartItemRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    private ProductRepository $productRepository;
    private CartItemRepository $cartItemRepository;

    public function __construct(ProductRepository $productRepository, CartItemRepository $cartItemRepository)
    {
        $this->productRepository = $productRepository;
        $this->cartItemRepository = $cartItemRepository;
    }

    #[Route('/api/products', name: 'app_api_products')]
    public function index(): JsonResponse
    {
        return $this->json(
            $this->productRepository->findAll(),
        );
    }

    #[Route('/api/product/{product}')]
    public function getProduct(Product $product): JsonResponse
    {
        return $this->json(
            $this->productRepository->find($product->getId())
        );
    }

    #[Route('/api/cartItem/{cartItem}')]
    public function getProductFromCartItem(CartItem $cartItem): JsonResponse
    {
        $cartItem = $this->cartItemRepository->find($cartItem->getId());
        return $this->json([
                "name" => $cartItem->getProduct()->getName(),
                "image" => $cartItem->getProduct()->getImage(),
                "price" => $cartItem->getProduct()->getPrice(),
            ]
        );
    }


}