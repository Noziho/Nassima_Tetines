<?php

namespace App\Controller\API;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    private ProductRepository $productRepository;

    public function __construct (ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    #[Route('/api/products', name: 'app_api_products')]
    public function index (): JsonResponse
    {
        return $this->json(
          $this->productRepository->findAll(),
        );
    }

    #[Route('/api/product/{product}')]
    public function getProduct (Product $product): JsonResponse
    {
        return $this->json(
            $this->productRepository->find($product->getId())
        );
    }



}