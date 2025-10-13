import { Repository } from "typeorm";
import { Link } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LinkRepository {
    constructor(
        @InjectRepository(Link) private readonly repo: Repository<Link>,
    ) { }

    async createAndSave(data: { originalUrl: string, shortCode: string }): Promise<Link> {
        const link = this.repo.create(data);
        return this.repo.save(link);
    }

    async findByShortCode(shortCode: string): Promise<Link | null> {
        return this.repo.findOne({ where: {shortCode} });
    }

    async findById(id: string): Promise<Link | null> {
        return this.repo.findOne({ where: {id} });
    }

    async existsByShortCode(shortCode: string): Promise<boolean> {
        return this.repo.exists({ where: {shortCode} });
    }
}